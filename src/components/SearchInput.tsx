import {
  BoxProps,
  BsSearch,
  Button,
  Container,
  Heading,
  InputGroup,
  InputLeftElement,
  usePrevious,
} from "@biblioteksentralen/js-utils";
import { Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMount } from "../utils/useMount";

const StyledForm = styled.form`
  display: flex;
  flex: 1;
  align-items: flex-end;
`;

function SearchInput({ ...chakraProps }: BoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const { push, query, pathname } = useRouter();

  useMount(() => {
    const urlQuery = typeof query.q === "string" ? query.q : undefined;
    // Prepoulerer søkefelt hvis det ligger et søk i url
    if (urlQuery && !value) {
      setValue(urlQuery);
    }
    // Sett fokus på søkefelt hvis vi er på forsiden
    if (pathname === "/") {
      inputRef.current?.focus();
    }
    // Setter/beholder fokus på søkefelt hvis man nettop har gjort et søk på forsiden
    if (urlQuery && urlQuery !== value) {
      inputRef.current?.focus();
    }
  });

  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      value && push(`/search?q=${value}`);
    },
    [value, push]
  );

  const prevValue = usePrevious(value);
  useEffect(() => {
    if (value === prevValue) return;
    // Søker automatisk etter 1 sekund
    const timeout = setTimeout(() => handleSubmit(), 1000);
    return () => clearTimeout(timeout);
  }, [value, handleSubmit, prevValue]);

  const label = "Søk etter et verk..";

  return (
    <Container
      maxW="container.lg"
      as="nav"
      backgroundColor="gray.800"
      color="white"
      paddingY="4rem"
      paddingX="0"
      borderRadius={{ lg: "xl" }}
      {...chakraProps}
    >
      <Container maxW="container.md">
        <Heading marginBottom=".5rem" fontSize="1.5rem">
          Søk i samlingen
        </Heading>
        <StyledForm role="search" onSubmit={handleSubmit}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="whiteAlpha.400" aria-hidden>
              <BsSearch />
            </InputLeftElement>
            <Input
              type="search"
              placeholder={label}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={inputRef}
              backgroundColor="whiteAlpha.200"
              color="whiteAlpha.900"
              borderRightRadius={0}
              _hover={{
                backgroundColor: "whiteAlpha.300",
              }}
              _focusVisible={{
                outline: "outline",
                boxShadow: "var(--chakra-shadows-outline)",
                backgroundColor: "whiteAlpha.300",
              }}
              minW={{ base: "14rem", sm: "17rem" }}
            />
          </InputGroup>
          <Button
            type="submit"
            variant="solid"
            backgroundColor={"whiteAlpha.300"}
            borderLeftRadius={0}
            _hover={{ backgroundColor: "whiteAlpha.400" }}
          >
            Søk
          </Button>
        </StyledForm>
      </Container>
    </Container>
  );
}

export default SearchInput;
