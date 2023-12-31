import GroupMultipleSelector, { Option } from "@/components/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const RecipientsDropdown = () => {
  const OPTIONS: Option[] = [
    { label: "Stitch", value: "Stitch1" },
    { label: "Talden", value: "Talden2" },
    // { label: "Remix", value: "remix" },
    // { label: "Vite", value: "vite" },
    // { label: "Nuxt", value: "nuxt" },
    // { label: "Vue", value: "vue" },
    // { label: "Svelte", value: "svelte" },
    // { label: "Angular", value: "angular" },
    // { label: "Ember", value: "ember", disable: true },
    // { label: "Gatsby", value: "gatsby", disable: true },
    // { label: "Astro", value: "astro" },
  ];

  return (
    <GroupMultipleSelector
      // value={field.value}
      // onChange={field.onChange}
      options={OPTIONS}
      placeholder="Select your recipients here..."
      //   emptyIndicator={
      //     <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
      //       no results found.
      //     </p>
      //   }
    />
  );
};

export default RecipientsDropdown;
