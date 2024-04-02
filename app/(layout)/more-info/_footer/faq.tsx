import React from "react";

const faqData = [
  {
    question: "What materials are the slippers made of?",
    answer:
      "Our slippers are made of high-quality sheeps wool with a leather bottom. They are sown together with a synthetic string for maximum comfort and durability.",
  },
  {
    question: "How do I clean my slippers?",
    answer:
      "We recommend hand washing your slippers with mild soap and cold water. Air dry them away from direct heat sources.",
  },
  {
    question: "Can I wear the slippers outdoors?",
    answer:
      "While our slippers are primarily designed for indoor use, they have a durable sole that allows for occasional outdoor wear.",
  },
];

export default function FAQ() {
  return (
    <div>
      {faqData.map((item, index) => (
        <div
          key={index}
          className="mb-4">
          <h1 className="italic font-semibold">{item.question}</h1>
          <p className="ml-4">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
