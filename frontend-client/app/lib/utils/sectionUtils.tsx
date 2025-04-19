import { sectionService } from "@/app/services/sectionService";
import type { Section } from "@/app/types/sectionType";

// 缓存部分数据以减少 API 调用
let sectionsCache: Section[] | null = null;

// 获取所有部分
export async function getAllSections(): Promise<Section[]> {
  if (!sectionsCache) {
    try {
      sectionsCache = await sectionService.sectionLists();
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      return [];
    }
  }
  return sectionsCache;
}

// 通过 slug 获取部分
export async function getSectionBySlug(slug: string): Promise<Section | null> {
  const sections = await getAllSections();
  return sections.find((section) => section.slug === slug) || null;
}

// 通过 slug 获取部分和子部分
export async function getSectionAndChildBySlug(
  sectionSlug: string,
  childSlug: string
) {
  const section = await getSectionBySlug(sectionSlug);

  if (!section || !section.children) {
    return { section: null, child: null };
  }

  const child = section.children.find((child) => child.slug === childSlug);

  return { section, child: child || null };
}
