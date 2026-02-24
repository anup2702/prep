export const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Clean lines, accent bars' },
  { id: 'classic', name: 'Classic', desc: 'Timeless professional look' },
  { id: 'minimal', name: 'Minimal', desc: 'Simple and elegant' },
];

export const defaultResumeData = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  experiences: [
    { company: '', role: '', dates: '', description: '' },
  ],
  education: [
    { school: '', degree: '', year: '' },
  ],
  skills: '',
};
