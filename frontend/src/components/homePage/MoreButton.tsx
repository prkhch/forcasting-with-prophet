import { StyledPageButton } from "styles/common/StyledButton";

const MoreButton = ({ func }: { func: () => void }) => {
  return (
    <StyledPageButton
      width="36"
      height="36"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={func}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.3332 32C21.3332 34.9455 18.9454 37.3333 15.9998 37.3333C13.0543 37.3333 10.6665 34.9455 10.6665 32C10.6665 29.0544 13.0543 26.6666 15.9998 26.6666C17.4143 26.6666 18.7709 27.2285 19.7711 28.2287C20.7713 29.2289 21.3332 30.5855 21.3332 32Z"
        fill="#F9F9F9"
        stroke="#2F70AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.3332 32C37.3332 34.9455 34.9454 37.3333 31.9998 37.3333C29.0543 37.3333 26.6665 34.9455 26.6665 32C26.6665 29.0544 29.0543 26.6666 31.9998 26.6666C34.9454 26.6666 37.3332 29.0544 37.3332 32Z"
        fill="#F9F9F9"
        stroke="#2F70AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.3332 32C53.3332 34.9455 50.9454 37.3333 47.9998 37.3333C45.0543 37.3333 42.6665 34.9455 42.6665 32C42.6665 29.0544 45.0543 26.6666 47.9998 26.6666C50.9454 26.6666 53.3332 29.0544 53.3332 32Z"
        fill="#F9F9F9"
        stroke="#2F70AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledPageButton>
  );
};

export default MoreButton;
