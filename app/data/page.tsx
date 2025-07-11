'use client'; // This is a Client Component due to useState and interactivity

import React, { useState } from 'react';
import clsx from 'clsx';
import {
  MagnifyingGlassIcon, // For search input
  BriefcaseIcon, // For department/role
  UsersIcon, // For team
  AcademicCapIcon, // For seniority
  SparklesIcon, // For skills
  ListBulletIcon, // For past projects
  EnvelopeIcon // For email
} from '@heroicons/react/24/outline'; // Importing outline icons

// Import the data from your data file
import { employees, allSkills, allProjects, Employee } from '../lib/it_team_dataset';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');

  // Extract unique departments and teams for filters
  const uniqueDepartments = ['All', ...new Set(employees.map(emp => emp.department))];
  const uniqueTeams = ['All', ...new Set(employees.map(emp => emp.team))];

  // Filter employees based on search term and selected filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          employee.past_projects.some(project => project.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    const matchesTeam = selectedTeam === 'All' || employee.team === selectedTeam;
    const matchesSkill = selectedSkill === 'All' || employee.skills.includes(selectedSkill);

    return matchesSearch && matchesDepartment && matchesTeam && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Our Talent Directory
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Discover the incredible people driving innovation at FGF Tech.
          </p>
        </header>

        {/* Filter and Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Search Employee</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, role, skill, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Department</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Team Filter */}
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Team</label>
              <select
                id="team"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                {uniqueTeams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            {/* Skill Filter */}
            <div>
              <label htmlFor="skill" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Skill</label>
              <select
                id="skill"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="All">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill.name} value={skill.name}>{skill.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-600 dark:text-gray-300 text-lg">
              No employees found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- EmployeeCard Component ---
// This is a sub-component to keep the main page cleaner
interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  // Function to get seniority label
  const getSeniorityLabel = (level: number) => {
    switch (level) {
      case 1: return 'Junior';
      case 2: return 'Intermediate';
      case 3: return 'Senior';
      case 4: return 'Lead/Director';
      case 5: return 'Executive';
      default: return 'Unknown';
    }
  };

  const seniorityColor = clsx(
    employee.seniority === 1 && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    employee.seniority === 2 && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    employee.seniority === 3 && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    employee.seniority === 4 && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    employee.seniority === 5 && 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Name and Role */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Avatar/Initial Placeholder */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
          {employee.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{employee.name}</h2>
          <p className="text-md text-blue-600 dark:text-blue-400 font-medium">{employee.role}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 flex-grow">
        <p className="flex items-center">
          <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
          <a href={`mailto:${employee.email}`} className="hover:underline text-blue-600 dark:text-blue-400">
            {employee.email}
          </a>
        </p>
        <p className="flex items-center">
          <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
          {employee.department} &mdash; {employee.team}
        </p>
        <p className="flex items-center">
          <AcademicCapIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
          Seniority: <span className={clsx("ml-1 px-2 py-0.5 rounded-full text-xs font-semibold", seniorityColor)}>
            {getSeniorityLabel(employee.seniority)}
          </span>
        </p>
      </div>

      {/* Skills */}
      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center mb-2">
          <SparklesIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
          Skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {employee.skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full dark:bg-purple-900 dark:text-purple-200">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Past Projects */}
      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center mb-2">
          <ListBulletIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
          Past Projects:
        </p>
        <div className="flex flex-wrap gap-2">
          {employee.past_projects.map(project => (
            <span key={project} className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full dark:bg-teal-900 dark:text-teal-200">
              {project}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};