import { StyledPageButton } from "styles/common/StyledButton";

const LeftButton = ({ func }: { func: () => void }) => {
  return (
    <StyledPageButton
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={func}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1733 1.92308L2.06667 9.56575C1.40333 10.0369 1.00926 10.8001 1.00926 11.6137C1.00926 12.4274 1.40333 13.1906 2.06667 13.6617L12.1733 22.0137C13.0283 22.6979 14.1898 22.8577 15.1978 22.43C16.2058 22.0023 16.8979 21.056 17 19.9657L17 3.96575C16.8961 2.87646 16.2034 1.93181 15.1957 1.50535C14.188 1.07888 13.0276 1.23927 12.1733 1.92308Z"
        fill="#F9F9F9"
        stroke="#2F70AF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledPageButton>
  );
};

export default LeftButton;
