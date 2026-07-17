import { PageSection } from '@/components/layout/page-section';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQSection() {
  const faqs = [
    { question: 'How can I volunteer with Stuti-Vani Foundation?', answer: 'You can apply to be a volunteer through our Volunteer portal. Simply fill out the form, and our coordinator will reach out to you.' },
    { question: 'Are my donations tax-deductible?', answer: 'Yes, all donations to Stuti-Vani Foundation are eligible for tax exemption under section 80G of the Income Tax Act.' },
    { question: 'How is the donated money utilized?', answer: '85% of all donations go directly to programmatic impact. The remaining 15% is utilized for organizational sustainability and administrative costs.' },
    { question: 'Can I sponsor a specific project?', answer: 'Absolutely. You can choose specific active campaigns on our Donate page and direct your funds there.' },
  ];

  return (
    <PageSection 
      className="bg-background"
      containerClassName="max-w-4xl mx-auto"
      headerClassName="text-center justify-center mx-auto"
      title="Frequently Asked Questions"
      description="Common questions about our organization and how you can help."
    >
      <Accordion className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/50 py-2">
            <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageSection>
  );
}
