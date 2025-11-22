import type { Stream, Subject, Note, BreadcrumbItem } from './types';

const streams: Stream[] = [
  { id: '1', name: 'Engineering', slug: 'engineering', description: 'Explore notes on various engineering disciplines, from mechanical to computer science.' },
  { id: '2', name: 'Pharmacy', slug: 'pharmacy', description: 'Access comprehensive study materials for pharmacy students, covering all major subjects.' },
  { id: '3', name: 'Medical', slug: 'medical', description: 'Find detailed notes and resources for medical students to aid in their studies.' },
];

const subjects: Subject[] = [
  { id: 's1', name: 'Thermodynamics', slug: 'thermodynamics', streamId: '1', description: 'Fundamentals of heat, work, and energy.' },
  { id: 's2', name: 'Fluid Mechanics', slug: 'fluid-mechanics', streamId: '1', description: 'Study of fluids and the forces on them.' },
  { id: 's3', name: 'Circuit Theory', slug: 'circuit-theory', streamId: '1', description: 'Analysis of electrical circuits.' },
  { id: 's4', name: 'Pharmacology', slug: 'pharmacology', streamId: '2', description: 'How drugs affect biological systems.' },
  { id: 's5', name: 'Pharmaceutical Chemistry', slug: 'pharmaceutical-chemistry', streamId: '2', description: 'The chemistry of drug design and synthesis.' },
  { id: 's6', name: 'Human Anatomy', slug: 'human-anatomy', streamId: '2', description: 'The structure of the human body.' },
  { id: 's7', name: 'Cardiology', slug: 'cardiology', streamId: '3', description: 'Study of the heart and cardiovascular system.' },
  { id: 's8', name: 'Neurology', slug: 'neurology', streamId: '3', description: 'Branch of medicine dealing with the nervous system.' },
];

const notes: Note[] = [
  { id: 'n1', title: 'Introduction to Thermodynamics', description: 'A comprehensive introduction to the first and second laws of thermodynamics.', subjectId: 's1', streamId: '1', fileUrl: '#', fileType: 'pdf', downloadCount: 1250, category: 'Introductory', tags: ['thermo', 'basics'] },
  { id: 'n2', title: 'Bernoulli\'s Principle Explained', description: 'An in-depth look at Bernoulli\'s principle and its applications in fluid dynamics.', subjectId: 's2', streamId: '1', fileUrl: '#', fileType: 'doc', downloadCount: 980, category: 'Core Concepts', tags: ['fluids', 'Bernoulli'] },
  { id: 'n3', title: 'Advanced Circuit Analysis', description: 'Covers advanced topics like Thevenin\'s theorem and Norton\'s theorem.', subjectId: 's3', streamId: '1', fileUrl: '#', fileType: 'video', downloadCount: 1500, category: 'Advanced', tags: ['circuits', 'theorems'] },
  { id: 'n4', title: 'Drug Interactions and Effects', description: 'A guide to understanding common drug interactions and their physiological effects.', subjectId: 's4', streamId: '2', fileUrl: '#', fileType: 'pdf', downloadCount: 2100, category: 'Clinical', tags: ['pharmacology', 'drugs'] },
  { id: 'n5', title: 'Organic Synthesis in Drug Discovery', description: 'An overview of the organic chemistry reactions used in modern drug discovery.', subjectId: 's5', streamId: '2', fileUrl: '#', fileType: 'pdf', downloadCount: 850, category: 'Chemistry', tags: ['synthesis', 'organic'] },
  { id: 'n6', title: 'The Musculoskeletal System', description: 'A detailed study of the bones, muscles, and joints of the human body.', subjectId: 's6', streamId: '2', fileUrl: '#', fileType: 'doc', downloadCount: 1150, category: 'Anatomy', tags: ['anatomy', 'muscles', 'bones'] },
  { id: 'n7', title: 'Understanding ECGs', description: 'A practical guide to reading and interpreting electrocardiograms.', subjectId: 's7', streamId: '3', fileUrl: '#', fileType: 'video', downloadCount: 3200, category: 'Diagnostics', tags: ['cardiology', 'ecg'] },
  { id: 'n8', title: 'Clinical Neurology Case Studies', description: 'A collection of case studies illustrating common neurological disorders.', subjectId: 's8', streamId: '3', fileUrl: '#', fileType: 'pdf', downloadCount: 1800, category: 'Clinical', tags: ['neurology', 'cases'] },
  { id: 'n9', title: 'Basic Electrical Engineering', description: 'Fundamental concepts of electrical engineering for beginners.', subjectId: 's3', streamId: '1', fileUrl: '#', fileType: 'pdf', downloadCount: 750, category: 'Introductory', tags: ['electricity', 'basics'] },
];

// Data fetching functions (simulating API/DB calls)
export const getStreams = async (): Promise<Stream[]> => {
  return Promise.resolve(streams);
};

export const getStreamBySlug = async (slug: string): Promise<Stream | undefined> => {
  return Promise.resolve(streams.find((s) => s.slug === slug));
};

export const getSubjects = async (): Promise<Subject[]> => {
  return Promise.resolve(subjects);
}

export const getSubjectsByStream = async (streamId: string): Promise<Subject[]> => {
  return Promise.resolve(subjects.filter((s) => s.streamId === streamId));
};

export const getSubjectById = async (id: string): Promise<Subject | undefined> => {
  return Promise.resolve(subjects.find((s) => s.id === id));
};

export const getSubjectBySlug = async (slug: string): Promise<Subject | undefined> => {
  return Promise.resolve(subjects.find((s) => s.slug === slug));
};

export const getNotesBySubject = async (subjectId: string): Promise<Note[]> => {
  return Promise.resolve(notes.filter((n) => n.subjectId === subjectId));
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  const note = notes.find((n) => n.id === id);
  if (!note) return undefined;
  
  const subject = subjects.find(s => s.id === note.subjectId);
  const stream = streams.find(s => s.id === note.streamId);
  
  return Promise.resolve({
    ...note,
    subjectName: subject?.name,
    streamName: stream?.name,
    streamSlug: stream?.slug,
    subjectSlug: subject?.slug
  });
};

export const getPopularNotes = async (): Promise<Note[]> => {
  const sortedNotes = [...notes].sort((a, b) => b.downloadCount - a.downloadCount);
  const detailedNotes = await Promise.all(sortedNotes.slice(0, 4).map(n => getNoteById(n.id)))
  return Promise.resolve(detailedNotes.filter((n): n is Note => n !== undefined));
};

export const searchNotes = async (query: string): Promise<Note[]> => {
  const lowerCaseQuery = query.toLowerCase();
  if (!lowerCaseQuery) return [];

  const results = notes.filter(note => {
    const stream = streams.find(s => s.id === note.streamId);
    const subject = subjects.find(s => s.id === note.subjectId);

    return (
      note.title.toLowerCase().includes(lowerCaseQuery) ||
      note.description.toLowerCase().includes(lowerCaseQuery) ||
      (stream && stream.name.toLowerCase().includes(lowerCaseQuery)) ||
      (subject && subject.name.toLowerCase().includes(lowerCaseQuery)) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  });
  
  const detailedNotes = await Promise.all(results.map(n => getNoteById(n.id)));
  return Promise.resolve(detailedNotes.filter((n): n is Note => n !== undefined));
};

export const getBreadcrumbs = async (type: 'stream' | 'subject' | 'note' | 'page', slugOrId: string): Promise<BreadcrumbItem[]> => {
  const home: BreadcrumbItem = { name: 'Home', href: '/' };
  let items: BreadcrumbItem[] = [home];

  if (type === 'stream') {
    const stream = await getStreamBySlug(slugOrId);
    if (stream) {
      items.push({ name: stream.name });
    }
  }

  if (type === 'subject') {
    const subject = await getSubjectBySlug(slugOrId);
    if (subject) {
      const stream = await getStreams().then(streams => streams.find(s => s.id === subject.streamId));
      if (stream) {
        items.push({ name: stream.name, href: `/${stream.slug}` });
        items.push({ name: subject.name });
      }
    }
  }

  if (type === 'note') {
    const note = await getNoteById(slugOrId);
    if (note) {
      const stream = await getStreamBySlug(note.streamSlug || '');
      const subject = await getSubjectBySlug(note.subjectSlug || '');
      if (stream && subject) {
        items.push({ name: stream.name, href: `/${stream.slug}` });
        items.push({ name: subject.name, href: `/${stream.slug}/${subject.slug}` });
        items.push({ name: note.title });
      }
    }
  }
  
  if (type === 'page') {
    items.push({ name: slugOrId });
  }
  
  return Promise.resolve(items);
};
