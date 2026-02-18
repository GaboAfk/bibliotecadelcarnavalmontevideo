export interface Category {
    name: string;
    slug: string;
    image: string;
}

export const categoriesData: Category[] = [
    {
        name: "Humoristas",
        slug: "humoristas",
        image: "https://images.unsplash.com/photo-1514306688772-e0d5d0b17d31?w=800&q=80",
    },
    {
        name: "Murgas",
        slug: "murgas",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    },
    {
        name: "Parodistas",
        slug: "parodistas",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80",
    },
    {
        name: "Revistas",
        slug: "revistas",
        image: "https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=800&q=80",
    },
    {
        name: "Sociedad de negros y lubolos",
        slug: "sociedades",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    },
];
