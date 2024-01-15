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
            className="flex p-4 text w-fit cursor-pointer bg-white dark:bg-black">
              Try for Free
              <ArrowRight className="ml-2"/>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-10">
          <video muted autoPlay loop className="rounded-md items-center" height={720} width={720}>
            <source
            type="video/mp4"
            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" />
          </video>
        </div>
      </div>
    </main>
  );
}
