import { Employee } from './it_team_dataset';

// This interface adds a score to the employee object for sorting
export interface ScoredEmployee extends Employee {
  score: number;
  matchingSkills: string[];
  matchingProjects: string[];
}

/**
 * Finds the top 1-3 employees based on a list of required skills and projects.
 * @param employees - The list of all employees.
 * @param requiredSkills - An array of skill names.
 * @param requiredProjects - An array of project names.
 * @returns An array of the top 1-3 scored employees.
 */
export function findTopEmployees(
  employees: Employee[],
  requiredSkills: string[],
  requiredProjects: string[]
): ScoredEmployee[] {
  const scoredEmployees = employees
    .map((employee): ScoredEmployee => {
      // Find intersections between employee's data and requirements
      const matchingSkills = employee.skills.filter(skill => requiredSkills.includes(skill));
      const matchingProjects = employee.past_projects.filter(project => requiredProjects.includes(project));

      // Calculate a simple score
      const score = matchingSkills.length + matchingProjects.length;

      return {
        ...employee,
        score,
        matchingSkills,
        matchingProjects,
      };
    })
    .filter(employee => employee.score > 0); // Only include employees with at least one match

  // Sort by score (descending), then by seniority as a tie-breaker (descending)
  scoredEmployees.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return b.seniority - a.seniority;
  });

  // Return the top 3
  return scoredEmployees.slice(0, 3);
}