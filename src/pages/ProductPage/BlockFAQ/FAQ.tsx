import { useState } from 'react';

import Plant from '@/shared/assets/images/Group 17.webp';
import cls from './blockFAQ.module.scss';

interface FAQItem {
  id: number;
  question: string;
  answer: string | React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What Makes Our Products Eco-Friendly?',
    answer: (
      <>
        Our products are made from sustainably sourced materials and are
        designed to minimize environmental impact. We prioritize using natural,
        organic, and biodegradable ingredients, as well as recyclable or
        compostable packaging. By choosing our products, you are supporting
        eco-friendly practices and helping to reduce waste and pollution.
      </>
    ),
  },
  {
    id: 2,
    question: 'How Do I Dispose of Used Products and Packaging?',
    answer: (
      <>
        We encourage you to recycle or compost our product packaging whenever
        possible. For specific disposal instructions:
        <ul>
          <li>
            <strong>Biodegradable packaging:</strong> Compost in your home
            compost bin or municipal composting facility.
          </li>
          <li>
            <strong>Recyclable packaging:</strong> Rinse and place in your
            recycling bin according to local recycling guidelines.
          </li>
          <li>
            <strong>Product containers:</strong> Reuse glass or metal containers
            for storage or crafts. If they are not reusable, recycle them as per
            local regulations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    question: 'Are Your Products Cruelty-Free and Vegan?',
    answer: (
      <>
        Yes, all our products are cruelty-free and vegan. We do not test on
        animals, and our products contain no animal-derived ingredients. We are
        committed to offering high-quality, ethical products that align with our
        values of compassion and sustainability.
      </>
    ),
  },
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAnswer = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={cls.faqWrapper}>
      <div className={cls.faqTitle}>FAQ</div>
      {faqItems.map((item) => (
        <div key={item.id} className={cls.faqItem}>
          <button
            type="button"
            className={cls.faqItemTitle}
            aria-expanded={openId === item.id ? 'true' : 'false'}
            onClick={() => toggleAnswer(item.id)}
          >
            {item.question}
          </button>
          {openId === item.id && (
            <div className={cls.faqItemAnswer}>{item.answer}</div>
          )}
        </div>
      ))}
      <img src={Plant} alt="" className={cls.plantImage} />
    </section>
  );
};
