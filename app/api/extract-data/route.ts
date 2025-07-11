import { NextResponse } from 'next/server';
import { allSkills, allProjects, employees } from '../../lib/it_team_dataset'; // Import your data
import { findTopEmployees } from '../../lib/employee_matcher'; // Import the new matcher function
import extractSkillsAndProjects, {
  generateRecommendationSummary
} from '../../model-APIs/OpenAI'; // Import both OpenAI functions

// Define the expected structure for the request body
interface RequestBody {
  message: string;
}

// The successful response is now a single string
interface ApiResponse {
  recommendation: string;
}

export async function POST(request: Request) {
  try {
    const { message }: RequestBody = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // STEP 1: Extract structured data (skills and projects) from the user's message
    const { relevant_skills, mentioned_projects } = await extractSkillsAndProjects(
      message,
      allSkills,
      allProjects
    );

    // Handle case where no specific keywords could be extracted
    if (relevant_skills.length === 0 && mentioned_projects.length === 0) {
      return NextResponse.json<ApiResponse>(
        { recommendation: "I couldn't identify any specific skills or projects from your request. Could you please try again with more detail?" },
        { status: 200 }
      );
    }

    // STEP 2: Find the top employees based on the extracted data (local logic)
    const topEmployees = findTopEmployees(employees, relevant_skills, mentioned_projects);

    // Handle case where no employees match the criteria
    if (topEmployees.length === 0) {
        return NextResponse.json<ApiResponse>(
        { recommendation: `I couldn't find any employees with experience in the following: ${[...relevant_skills, ...mentioned_projects].join(', ')}.` },
        { status: 200 }
      );
    }

    // STEP 3: Generate a natural language response using the top employees found
    const recommendationText = await generateRecommendationSummary(message, topEmployees);

    // STEP 4: Return the final, user-friendly string
    return NextResponse.json<ApiResponse>({ recommendation: recommendationText }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process your request.' }, { status: 500 });
  }
}