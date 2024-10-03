import {
  Box,
  BoxProps,
  Button,
  Container,
  InputGroup,
  InputLeftElement,
  Stack,
  usePrevious,
} from "@biblioteksentralen/react";
import { Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { useMount } from "../utils/useMount";
import { Search } from "react-feather";

const StyledForm = styled.form`
  display: flex;
  flex: 1;
  align-items: flex-end;
`;

function SearchInput({ ...chakraProps }: BoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const { push, query, pathname } = useRouter();
  const inputId = useId();

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
      value && push(`/sok?q=${value}`);
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

  return (
    <Container
      maxW="container.lg"
      as="nav"
      backgroundColor="gray.800"
      color="white"
      paddingY={{ base: "1rem", md: "2rem" }}
      paddingX="0"
      borderRadius={{ lg: "xl" }}
      {...chakraProps}
    >
      <Container maxW="container.md">
        <Stack spacing=".25rem">
          <Box as="label" htmlFor={inputId} fontWeight="600" fontSize="1.5rem">
            Søk i samlingen
          </Box>
          <StyledForm role="search" onSubmit={handleSubmit}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="whiteAlpha.500" aria-hidden>
                <Search size="1em" />
              </InputLeftElement>
              <Input
                id={inputId}
                type="search"
                placeholder="Søk etter et verk.."
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
        </Stack>
      </Container>
    </Container>
  );
}

export default SearchInput;
