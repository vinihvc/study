import { exercises } from "collections/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";

import type { TestCase } from "@/types/exercise";

const SORT_ORDER = ["easy", "medium", "hard"] as const;

export const exerciseSource = loader({
  baseUrl: "/e",
  slugs(file) {
    return [file.data.title.toLowerCase().replaceAll(" ", "-")];
  },
  source: toFumadocsSource(exercises, []),
});

type ExercisePage = ReturnType<typeof exerciseSource.getPages>[number];

export interface ExerciseListItem {
  slug: string;
  title: string;
  difficulty: (typeof SORT_ORDER)[number];
  excerpt?: string;
  description?: string;
}

export type Exercise = ExerciseListItem;

export interface ExerciseNav {
  slug: string | null;
  title: string | null;
}

export type ExerciseDetail = ExerciseListItem & {
  starter: string;
  tests?: TestCase[];
  solved?: boolean;
  prev: ExerciseNav;
  next: ExerciseNav;
};

export interface SearchExerciseItem {
  slug: string;
  title: string;
  difficulty: ExerciseListItem["difficulty"];
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

export const getExerciseList = (): ExerciseListItem[] =>
  getExercisePages()
    .map((page) => ({
      description: page.data.description,
      difficulty: page.data.difficulty,
      excerpt: page.data.excerpt,
      slug: slugFromPage(page),
      title: page.data.title,
    }))
    .toSorted(
      (a, b) =>
        SORT_ORDER.indexOf(a.difficulty) - SORT_ORDER.indexOf(b.difficulty)
    );

export const getSearchExercises = (): SearchExerciseItem[] =>
  getExerciseList().map((exercise) => ({
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
