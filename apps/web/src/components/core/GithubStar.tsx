import React from "react";
import { Button } from "../ui/button";

function GithubStar() {
  return (
    <div className="">
      <a
        href="https://github.com/dev0jha/CoderWrap"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="outline"
          size="sm"
          className="font-geist-mono text-[10px] tracking-[0.2em] uppercase hidden sm:inline-flex"
        >
          GITHUB_STAR_SOURCE
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="font-geist-mono text-[10px] tracking-[0.1em] uppercase sm:hidden px-2"
        >
          ★ STAR
        </Button>
      </a>
    </div>
  );
}

export default GithubStar;
