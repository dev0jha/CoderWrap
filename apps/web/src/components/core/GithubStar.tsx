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
          className="font-geist-mono text-[10px] tracking-[0.2em] uppercase"
        >
          GITHUB_STAR_SOURCE
        </Button>
      </a>
    </div>
  );
}

export default GithubStar;
