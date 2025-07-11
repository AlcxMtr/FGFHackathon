// Assuming this is what you're trying to achieve with a standard OpenAI ChatCompletion call
// If 'openai.responses.create' is a custom or very specific internal method,
// you might need to check its exact return type or documentation.

import OpenAI from "openai";
import { Skill, Project } from '../lib/it_team_dataset';
import { ScoredEmployee } from "../lib/employee_matcher";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Correct way to access the environment variable
});

// Define the expected structure of the JSON output from the AI
interface ExtractionResult {
  relevant_skills: string[];
  mentioned_projects: string[];
}

export async function generateRecommendationSummary(
  originalMessage: string,
  topEmployees: ScoredEmployee[]
): Promise<string> {
  if (!topEmployees || topEmployees.length === 0) {
    return "I couldn't find any employees matching the criteria.";
  }

  // Create detailed profiles for the AI to understand the context
  const employeeProfiles = topEmployees.map(emp =>
    `Name: ${emp.name}\n- Role: ${emp.role}\n- Matching Skills: ${emp.matchingSkills.join(', ') || 'N/A'}\n- Matching Projects: ${emp.matchingProjects.join(', ') || 'N/A'}`
  ).join('\n\n');

  const recommendationPrompt = `
    Your task is to act as a helpful HR assistant. Based on a user's request and a list of top candidates I provide, you need to write a brief, natural language summary recommending these employees.

    The user's original request was: "${originalMessage}"

    Here are the top candidates we found and why they match:
    ${employeeProfiles}

    Please write a concise and friendly response that:
    1.  Starts by clearly listing the recommended employee(s) by name.
    2.  Briefly explains *why* they are a great fit, referencing their specific matching skills and project experience.
    3.  The entire output must be a single string of text, not JSON.

    Example response format: "Based on your request, I'd recommend looking into Alex Green and Sophie Nguyen. Alex has direct experience with the 'Mobile Orders App' and brings 'Kotlin' and 'Terraform' skills to the table, while Sophie has a strong background in 'JavaScript' and worked on 'Cloud Migration Phase 2'."
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a helpful HR assistant who writes clear, concise recommendations." },
        { role: "user", content: recommendationPrompt },
      ],
      temperature: 0.5, // A little creativity is good here for natural language
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content ?? "Sorry, I was unable to generate a summary.";
  } catch (error) {
    console.error("Error generating recommendation summary with OpenAI:", error);
    throw error;
  }
}

export default async function extractSkillsAndProjects(
  message: string, skills: Skill[], projects: Project[]
): Promise<ExtractionResult> { // Use the defined interface for clarity
  // Basic input validation
  if (!message || !Array.isArray(skills) || !Array.isArray(projects) || skills.length === 0 || projects.length === 0) {
    throw new Error("Invalid input: message, non-empty skills array, and non-empty projects array are required.");
  }

  const skillList = skills.map(skill => skill.name);
  const projectList = projects.map(project => project.name);

  // Construct a more explicit prompt for the AI
  const detailedPrompt = `
    Based on the following message, identify and extract any relevant skills and projects.
    You must be somewhat liberal in your interpretation of the message to ensure you capture all relevant keywords.
    You must only use skills from this list: ${skillList.join(', ')}.
    You must only use projects from this list: ${projectList.join(', ')}.
    If no relevant skills or projects are found, return empty arrays.

    Message: "${message}"

    Please return the result as a JSON object with two keys: "relevant_skills" (an array of strings) and "mentioned_projects" (an array of strings).
    Example: {"relevant_skills": ["JavaScript", "React"], "mentioned_projects": ["Mobile Orders App"]}
  `;

  try {
    // This is the standard way to request JSON output using chat completions in OpenAI SDK v4+
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // Or "gpt-3.5-turbo" for cheaper/faster, or "gpt-4-turbo" etc.
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to extract information from text and output JSON."
        },
        {
          role: "user",
          content: detailedPrompt,
        },
      ],
      response_format: { type: "json_object" }, // This is the key for JSON output
      temperature: 0.0, // Low temperature for consistent extraction
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      console.error("OpenAI response content was empty.");
      return { relevant_skills: [], mentioned_projects: [] };
    }

    // Attempt to parse the content as JSON
    const parsedResult: ExtractionResult = JSON.parse(content);

    // Basic validation of the parsed structure
    if (
      typeof parsedResult === 'object' &&
      Array.isArray(parsedResult.relevant_skills) &&
      Array.isArray(parsedResult.mentioned_projects)
    ) {
      // Filter to ensure only valid items from your lists are returned,
      // as the AI might sometimes hallucinate
      const filteredSkills = parsedResult.relevant_skills.filter(skill => skillList.includes(skill));
      const filteredProjects = parsedResult.mentioned_projects.filter(project => projectList.includes(project));

      return {
        relevant_skills: filteredSkills,
        mentioned_projects: filteredProjects
      };
    } else {
      console.error("OpenAI response did not contain expected JSON structure after parsing:", parsedResult);
      return { relevant_skills: [], mentioned_projects: [] };
    }

  } catch (error) {
    console.error("Error extracting skills and projects with OpenAI:", error);
    // Re-throw the error to be handled by the caller
    throw error;
  }

}