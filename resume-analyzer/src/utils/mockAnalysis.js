const SECTIONS = [
  { name: 'Format & Structure', score: 85, tip: 'Good use of sections.' },
  { name: 'Keywords', score: 72, tip: 'Add more industry keywords.' },
  { name: 'Length', score: 80, tip: 'Appropriate length.' },
  { name: 'Experience', score: 75, tip: 'Quantify achievements.' },
];

const SUGGESTIONS = [
  'Add measurable achievements (e.g., "Increased sales by 20%").',
  'Include relevant skills matching the job description.',
  'Add a concise professional summary at the top.',
];

const KEYWORDS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Communication',
  'Team Leadership', 'Problem Solving', 'Project Management',
];

export function generateMockAnalysis(fileName, jobDescription = null) {
  const baseScore = 70 + Math.floor(Math.random() * 25);
  const jobMatch = jobDescription?.trim().length
    ? Math.min(95, 60 + Math.floor(Math.random() * 35))
    : null;

  return {
    fileName: fileName || 'resume.pdf',
    overallScore: baseScore,
    jobMatchScore: jobMatch,
    sections: SECTIONS.map((s) => ({
      ...s,
      score: Math.min(95, s.score + Math.floor(Math.random() * 10) - 5),
    })),
    suggestions: SUGGESTIONS,
    keywords: KEYWORDS.slice(0, 4 + Math.floor(Math.random() * 4)),
  };
}
