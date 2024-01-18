import FaqAccordion from "@/components/faq-accordion";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex bg-red-700 gap-10 flex-col lg:flex-row ">
        <div className="flex flex-col gap-10 lg:w-2/5 p-10 rounded-sm bg-red-600">
          <h1 className="text-5xl text-white">
            Welcome to <strong>DumpDrive</strong> –{" "}
            <span className="text-4xl">Your Secure Cloud Storage Solution</span>
          </h1>
          <h3 className="text-xl text-white">
            Are you tired of juggling multiple devices, constantly emailing
            files to yourself, or worrying about the safety of your important
            documents? Look no further! DumpDrive is here to revolutionize the
            way you store, access, and share your files.
          </h3>
          <div>
            <Link
              href={"/dashboard"}
              className="flex p-4 text w-fit cursor-pointer bg-white dark:bg-black"
            >
              Try for Free
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-10">
          <video
            muted
            autoPlay
            loop
            className="rounded-md items-center"
            height={720}
            width={720}
          >
            <source
              type="video/mp4"
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
            />
          </video>
        </div>
      </div>
      <div className="flex flex-col w-full items-center mt-5">
        <div className="flex flex-col text-center items-center">
          <h1 className="text-3xl m-1 font-serif">
            Focus on the work that matters
          </h1>
          <p className="lg:w-2/3">
            Scattered content, constant interruptions—there’s a smarter way to
            work.
            DumpDrop helps people be organized, get in sync, and stay secure
            with their teams.
          </p>
        </div>

        <div className="flex flex-col text-center items-center mt-5">
          <h1 className="text-3xl m-1 font-serif">Be organized</h1>
          <p className="lg:w-2/3">
            Bring traditional files, cloud content, Dropbox Paper docs, and web
            shortcuts together in one place, so you can organize and tackle your
            work efficiently.
          </p>
        </div>

        <div className="flex flex-col text-center items-center mt-5">
          <h1 className="text-3xl m-1 font-serif">See more features</h1>
        </div>

        <FaqAccordion />
        <Footer />
      </div>
    </main>
  );
}
