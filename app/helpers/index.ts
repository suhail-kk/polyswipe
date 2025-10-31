import { BACKGROUNDS } from "@/constants";

export function getNextBackground(currentBg: string): string {
    const currentIndex = BACKGROUNDS.findIndex(bg => bg.url === currentBg);
    const nextIndex = (currentIndex + 1) % BACKGROUNDS.length; // infinite loop
    return BACKGROUNDS[nextIndex].url;
}
