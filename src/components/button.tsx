import styled from "styled-components";
import tw from "twin.macro";
import { handleOutline, handleVariant, handleSize } from "utils/buttonUtils";
import { IButton } from "../../types";

const Styles = {
  Filled: styled.button<IButton>`
    ${({ size }) => handleSize(size)}
    ${({ variant }) => handleVariant(variant)}
    ${tw`translate-x-1 transition duration-500 my-2`}
    ${({ rounded }) => rounded && tw`rounded-md`}
  `,
  Outline: styled.button<IButton>`
    ${({ size }: any) => handleSize(size)}
    ${({ variant }: any) => handleOutline(variant)}
    ${tw`border translate-x-1 transition duration-500 my-2`}
    ${({ rounded }) => rounded && tw`rounded-md`}
  `,
  Text: styled.button<IButton>`
    ${tw`text-sm relative h-10 px-4 flex flex-shrink-0 items-center justify-center rounded-lg `}
    ${({ variant }) => handleVariant(variant)}
      &[disabled] {
      ${tw`bg-gray-500 cursor-not-allowed text-gray-700`}
    }
  `,
};

const Button = {
  Filled: ({ children, ...props }: IButton): JSX.Element => (
    <Styles.Filled {...props}>{children}</Styles.Filled>
  ),
  Outline: ({ children, ...props }: IButton): JSX.Element => (
    <Styles.Outline {...props}>{children}</Styles.Outline>
  ),
};

export default Button;
