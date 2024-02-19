import React, { useState } from "react";
import { styled } from "styled-components";
import { StyledUl, StyledLi, StyledSelect } from "styles/common/StyledDropDown";
import { StyledLabel } from "styles/common/StyledLabel";
import { CATEGORY } from "constants/CATEGORY";

const CategoryInput = ({
  categoryId,
  setCategoryId,
}: {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [visible, setVisible] = useState(false);

  const [categorys, setCategorys] = useState(CATEGORY);

  const selectedCategoryName = categorys[categoryId];

  return (
    <StyledInputForm>
      <StyledLabel>Category</StyledLabel>
      <StyledSelect onClick={() => setVisible(!visible)}>
        {selectedCategoryName}
        <img src="icons/dropdown_arrow.svg" alt="" />
      </StyledSelect>
      {visible && (
        <StyledUl>
          {Object.entries(categorys).map(([id, categoryName]) => (
            <StyledLi
              key={id}
              onClick={() => {
                setCategoryId(id);
                setVisible(false);
              }}
            >
              {categoryName}
            </StyledLi>
          ))}
        </StyledUl>
      )}
    </StyledInputForm>
  );
};

export default CategoryInput;

const StyledInputForm = styled.div`
  width: 60%;
`;
