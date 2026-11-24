import { getEntry, type CollectionEntry } from 'astro:content';
import { ko } from '../i18n/ko';

export type Profile = CollectionEntry<'profile'>['data'];

export async function getProfile(): Promise<Profile> {
  const profile = await getEntry('profile', 'profile');

  if (!profile) {
    throw new Error('Missing profile.yaml');
  }

  return profile.data;
}

export function fullName(profile: Profile) {
  return `${profile.name_ko} (${profile.name_en})`;
}

export function socialLinks(profile: Profile) {
  return (Object.keys(ko.social) as (keyof typeof ko.social)[]).flatMap((key) => {
    const link = profile.links[key];
    if (!link) return [];

    return [{ key, label: ko.social[key], url: key === 'email' ? `mailto:${link}` : link }];
  });
}

export function dateTime(date: string) {
  return date.replaceAll('.', '-');
}

export function formatBuildDate(date: Date) {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  return ['year', 'month', 'day'].map((part) =>
    parts.find(({ type }) => type === part)?.value,
  ).join('.');
}
