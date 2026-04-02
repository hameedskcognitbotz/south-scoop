import { useState, useEffect } from 'react';
import type { Article } from '@/data/mockArticles';

export const useReadingList = () => {
    const [saved, setSaved] = useState<Article[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('reading-list');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSaved(parsed);
            } catch (e) {
                console.error("Failed to parse reading list", e);
            }
        }
    }, []);

    const toggleSave = (article: Article) => {
        const isAlreadySaved = saved.some(a => a.id === article.id);
        let newList;
        if (isAlreadySaved) {
            newList = saved.filter(a => a.id !== article.id);
        } else {
            newList = [...saved, article];
        }
        setSaved(newList);
        localStorage.setItem('reading-list', JSON.stringify(newList));
        return !isAlreadySaved;
    };

    const isSaved = (id: string) => saved.some(a => a.id === id);

    return { saved, toggleSave, isSaved };
};
