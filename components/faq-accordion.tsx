import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqAccordion = () => {
  const faqQuestions = [
    {
      heading: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      heading: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      heading: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
  ];

  return (
    <>
      <div className="flex flex-col text-center items-center mt-16 lg:w-2/3 mx-5 mb-24">
        <h1 className="text-3xl m-1 font-mono">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          {/* {faqQuestions.map()} */}
          <AccordionItem value="item-1">
            <AccordionTrigger>Is my data secure on DumpDrop?</AccordionTrigger>
            <AccordionContent>
              Yes, we take data security seriously. DumpDrop employs encryption
              protocols to ensure the confidentiality and integrity of your data
              during transit and storage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How can I share files with others using DumpDrop?
            </AccordionTrigger>
            <AccordionContent>
              Sharing files on DumpDrop is easy. After uploading your files, you
              can generate a shareable link or invite specific users to access
              your files.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do I upload files to DumpDrop?
            </AccordionTrigger>
            <AccordionContent>
              To upload files to DumpDrop, simply click on the &quot;Upload&quot; button
              located on the main dashboard. You can then select the files you
              want to upload from your device. DumpDrop supports a variety of
              file types, and you can upload multiple files
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default FaqAccordion;
