import tw from "twin.macro";

export const handleVariant = (variant: string | undefined) => {
  switch (variant) {
    case "primary":
      return tw`bg-blue-500 hover:bg-blue-600 text-white`;
    case "success":
      return tw`bg-green-500  hover:bg-green-600 text-white`;
    case "danger":
      return tw`bg-red-500 hover:bg-red-600 text-white`;
    default:
      return tw`bg-blue-500 hover:bg-blue-600 text-white`;
  }
};

export const handleOutline = (variant: string | undefined) => {
  switch (variant) {
    case "primary":
      return tw`border-blue-500 hover:border-blue-600`;
    case "success":
      return tw`border-green-500 hover:border-green-600`;
    case "danger":
      return tw`border-red-500 hover:border-red-600`;
    default:
      return tw`border-blue-500 hover:border-blue-600`;
  }
};

export const handleSize = (size: string | undefined) => {
  switch (size) {
    case "medium":
      return tw`py-3 px-6`;
    case "large":
      return tw`py-3 px-12`;
    case "xl":
      return tw`px-24 py-3`;
    case "full":
      return tw`px-20 w-full py-2`;
    default:
      return tw`py-3 px-6`;
  }
};
