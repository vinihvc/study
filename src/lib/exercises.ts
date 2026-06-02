import type { TestCase } from "@/types/exercise";

import { source } from "./source";

const SORT_ORDER = ["easy", "medium", "hard"] as const;

export const exerciseSource = source;

export type ExercisePage = ReturnType<typeof exerciseSource.getPages>[number];

export interface ExerciseListItem {
  description?: string;
  difficulty: (typeof SORT_ORDER)[number];
  excerpt?: string;
  slug: string;
  title: string;
}

export interface ExerciseNav {
  slug: string | null;
  title: string | null;
}

export type ExerciseDetail = {
  description?: string;
  difficulty: (typeof SORT_ORDER)[number];
  excerpt?: string;
  slug: string;
  title: string;
  starter: string;
  tests?: TestCase[];
  solved?: boolean;
  prev: ExerciseNav;
  next: ExerciseNav;
};

export interface SearchExerciseItem {
  difficulty: ExerciseDetail["difficulty"];
  slug: string;
  title: string;
}

const slugFromPage = (page: ExercisePage) =>
  page.slugs[0] ?? page.data.title.toLowerCase().replaceAll(" ", "-");

const buildExerciseDetail = (
  page: ExercisePage,
  pages: ExercisePage[]
): ExerciseDetail => {
  const slug = slugFromPage(page);
  const idx = pages.findIndex((item) => slugFromPage(item) === slug);

  return {
    description: page.data.description,
    difficulty: page.data.difficulty,
    excerpt: page.data.excerpt,
    next: {
      slug: idx < pages.length - 1 ? slugFromPage(pages[idx + 1]) : null,
      title: idx < pages.length - 1 ? pages[idx + 1].data.title : null,
    },
    prev: {
      slug: idx > 0 ? slugFromPage(pages[idx - 1]) : null,
      title: idx > 0 ? pages[idx - 1].data.title : null,
    },
    slug,
    solved: page.data.solved,
    starter: page.data.starter,
    tests: page.data.tests,
    title: page.data.title,
  };
};

export const getExercisePages = () => exerciseSource.getPages();

export const getExerciseList = (): ExercisePage[] =>
  [...getExercisePages()].sort(
    (a, b) =>
      SORT_ORDER.indexOf(a.data.difficulty) -
      SORT_ORDER.indexOf(b.data.difficulty)
  );

export const getExerciseListItems = (): ExerciseListItem[] =>
  getExerciseList().map((page) => ({
    description: page.data.description,
    difficulty: page.data.difficulty,
    excerpt: page.data.excerpt,
    slug: slugFromPage(page),
    title: page.data.title,
  }));

export const getSearchExercises = (): SearchExerciseItem[] =>
  getExerciseListItems().map((exercise) => ({
    difficulty: exercise.difficulty,
    slug: exercise.slug,
    title: exercise.title,
  }));

export const getExerciseMetaBySlug = (
  slug: string
): { exercise: ExerciseDetail; path: string } | null => {
  const page = exerciseSource.getPage([slug]);

  if (!page) {
    return null;
  }

  return {
    exercise: buildExerciseDetail(page, getExercisePages()),
    path: page.path,
  };
};
