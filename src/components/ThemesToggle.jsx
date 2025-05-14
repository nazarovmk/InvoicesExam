import { ArrowBigDown, LucideMoonStar, LucideSunDim } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function ThemesToggle() {
  const [dark, setDark] = useState(
    document.documentElement.dataset.theme.startsWith("dark-")
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  const { themes } = useAppStore();
  function handleTheme(type, mode) {
    const html = document.documentElement;
    let isDark;
    if (html.dataset.theme.startsWith("dark-")) {
      isDark = true;
    } else {
      isDark = false;
    }

    if (mode === "theme") {
      if (isDark) {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      } else {
        html.dataset.theme = type;
        setTheme(type);
      }
    } else if (mode === "dark") {
      if (type.startsWith("dark-")) {
        html.dataset.theme = type.replace("dark-", "");
        setTheme(type.replace("dark-", ""));
      } else {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <div className="flex gap-5 md:flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="cursor-pointer">
            Themes <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:!w-[103px] min-w-0 z-[999]">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {themes.map((el, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    handleTheme(el, "theme");
                  }}
                  className="justify-start"
                  variant="ghost"
                >
                  {el}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        className="rounded-full cursor-pointer"
        onClick={() => {
          handleTheme(theme, "dark");
        }}
      >
        {dark ? <LucideSunDim /> : <LucideMoonStar />}
      </Button>
    </div>
  );
}
