export type Newsletter = {
  title: string;
  content: string;
  scheduledFor: string;
  template: 'DEFAULT' | 'MINIMAL' | 'FEATURED';
};

export type NewsletterFormData = {
  title: string;
  content: string;
  scheduledFor: string;
  template: 'DEFAULT' | 'MINIMAL' | 'FEATURED';
};