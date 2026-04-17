import { Theme } from './theme-provider';

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