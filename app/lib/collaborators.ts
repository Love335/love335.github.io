export interface Collaborator {
  name: string;
  image: string;
  link?: string;
}

export const COLLABORATORS = {
  max: {
    name: "Max Koste",
    image: "/collaborators/max_koste.jpg",
    link: "https://www.linkedin.com/in/maxkoste/",
  },
  emmi: {
    name: "Emmi Masalkovski",
    image: "/collaborators/emmi_masalkovski.jpg",
    link: "https://www.linkedin.com/in/emmi-masalkovski-05a89339a/",
  },
  linn: {
    name: "Linn Otendal",
    image: "/collaborators/linn_otendal.jpg",
    link: "https://www.linkedin.com/in/linnotendal/",
  },
  david: {
    name: "David Lexe",
    image: "/collaborators/david_lexe.jpg",
    link: "https://www.linkedin.com/in/david-lexe-b8a166388/",
  },
} satisfies Record<string, Collaborator>;
