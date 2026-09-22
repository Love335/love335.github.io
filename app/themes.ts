import { Theme } from './theme-provider';

export const aboutTheme: Theme = {
  page: {
    background: "bg-[var(--about-background)]",
    text: "text-[var(--about-foreground)]",
  },
  text: {
    heading: "text-[var(--about-primary)]",
    subheading: "text-[var(--about-muted)]",
    body: "text-[var(--about-muted)]",
    sectionTitle: "text-[var(--about-primary)]",
  },
  surfaces: {
    card: "bg-[var(--about-surface)] border border-[var(--about-border)]",
  },
  collaborators: {
    title: "text-[var(--about-muted)]",
    name: "text-[var(--about-foreground)]",
    border: "border-[var(--about-border)]",
    borderHover: "group-hover:border-[var(--about-accent)]",
  },
  skills: {
    container: "bg-[var(--about-surface)] border border-[var(--about-border)]",
    headerText: "text-[var(--about-muted)]",
    rowHover: "hover:bg-[var(--about-row-hover-surface)]",
    categoryText: "text-[var(--about-primary)]",
    itemsText: "text-[var(--about-muted)]",
    border: "border-[var(--about-border)]",
    divider: "divide-[var(--about-muted)]",
  },
};

export const beatnikTheme: Theme = {
  page: {
    background: "",
    text: "",
  },
  text: {
    heading: "text-foreground",
    subheading: "text-muted",
    body: "text-muted",
    sectionTitle: "text-foreground",
  },
  surfaces: {
    card: "bg-surface border border-border",
  },
  collaborators: {
    title: "text-muted",
    name: "text-foreground",
    border: "border-border",
    borderHover: "group-hover:border-accent",
  },
  skills: {
    container: "bg-surface border border-border",
    headerText: "text-muted",
    rowHover: "hover:bg-[var(--row-hover-walnut)]",
    categoryText: "text-foreground",
    itemsText: "text-muted",
    border: "border-border",
    divider: "divide-muted",
  },
};

export const breakevenTheme: Theme = {
  page: {
    background: "bg-muted",
    text: "text-foreground",
  },
  text: {
    heading: "text-primary",
    subheading: "text-subtle",
    body: "text-subtle",
    sectionTitle: "text-primary",
  },
  surfaces: {
    card: "bg-surface border border-border",
  },
  collaborators: {
    title: "text-subtle",
    name: "text-primary",
    border: "border-primary",
    borderHover: "group-hover:border-accent",
  },
  skills: {
    container: "bg-primary border border-border",
    headerText: "text-muted",
    rowHover: "hover:bg-[var(--row-hover-primary)]",
    categoryText: "text-color-6",
    itemsText: "text-muted",
    border: "border-primary",
    divider: "divide-muted",
  },
};

export const bonsaiTheme: Theme = {
  page: {
    background: "bg-[var(--bonsai-surface)]",
    text: "text-[var(--bonsai-muted)]",
  },

  text: {
    heading: "text-[var(--bonsai-primary)]",
    subheading: "text-[var(--bonsai-muted)]",
    body: "text-[var(--bonsai-muted)]",
    sectionTitle: "text-[var(--bonsai-primary)]",
  },

  surfaces: {
    card: "bg-[var(--bonsai-surface-deep)] border border-[var(--bonsai-border)]",
  },

  collaborators: {
    title: "text-[var(--bonsai-muted)]",
    name: "text-[var(--bonsai-primary)]",
    border: "border-[var(--bonsai-primary)]",
    borderHover: "group-hover:border-[var(--bonsai-accent)]",
  },

  skills: {
    container: "bg-[var(--bonsai-surface-deep)] border border-[var(--bonsai-border)]",
    headerText: "text-[var(--bonsai-primary)]",
    rowHover: "hover:bg-[var(--bonsai-row-hover)]",
    categoryText: "text-[var(--bonsai-primary)]",
    itemsText: "text-[var(--bonsai-muted)]",
    border: "border-[var(--bonsai-border)]",
    divider: "divide-[var(--bonsai-primary)]",
  },
};

export const localheroTheme: Theme = {
  page: {
    background: "bg-[var(--localhero-background)]",
    text: "text-[var(--localhero-foreground)]",
  },

  text: {
    heading: "text-[var(--localhero-primary)]",
    subheading: "text-[var(--localhero-muted)]",
    body: "text-[var(--localhero-muted)]",
    sectionTitle: "text-[var(--localhero-primary)]",
  },

  surfaces: {
    card: "bg-[var(--localhero-surface)] border border-[var(--localhero-border)]",
  },

  collaborators: {
    title: "text-[var(--localhero-muted)]",
    name: "text-[var(--localhero-primary)]",
    border: "border-[var(--localhero-border)]",
    borderHover: "group-hover:border-[var(--localhero-accent)]",
  },

  skills: {
    container: "bg-[var(--localhero-surface)] border border-[var(--localhero-border)]",
    headerText: "text-[var(--localhero-primary)]",
    rowHover: "hover:bg-[var(--localhero-row-hover)]",
    categoryText: "text-[var(--localhero-primary)]",
    itemsText: "text-[var(--localhero-muted)]",
    border: "border-[var(--localhero-border)]",
    divider: "divide-[var(--localhero-border)]",
  },
};

export const moneymakerTheme: Theme = {
  page: {
    background: "bg-[var(--moneymaker-background)]",
    text: "text-[var(--moneymaker-foreground)]",
  },

  text: {
    heading: "text-[var(--moneymaker-primary)]",
    subheading: "text-[var(--moneymaker-muted)]",
    body: "text-[var(--moneymaker-muted)]",
    sectionTitle: "text-[var(--moneymaker-primary)]",
  },

  surfaces: {
    card: "bg-[var(--moneymaker-surface)] border border-[var(--moneymaker-border)]",
  },

  collaborators: {
    title: "text-[var(--moneymaker-muted)]",
    name: "text-[var(--moneymaker-foreground)]",
    border: "border-[var(--moneymaker-border)]",
    borderHover: "group-hover:border-[var(--moneymaker-accent)]",
  },

  skills: {
    container: "bg-[var(--moneymaker-surface)] border border-[var(--moneymaker-border)]",
    headerText: "text-[var(--moneymaker-muted)]",
    rowHover: "hover:bg-[var(--moneymaker-row-hover)]",
    categoryText: "text-[var(--moneymaker-primary)]",
    itemsText: "text-[var(--moneymaker-muted)]",
    border: "border-[var(--moneymaker-border)]",
    divider: "divide-[var(--moneymaker-border)]",
  },
};