import { Box, BoxProps, Button, Container, Icon, Input, InputGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { Search } from "react-feather";
import { useMount } from "../utils/useMount";

function SearchInput({ ...chakraProps }: BoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { push, query, pathname } = useRouter();
  const urlQuery = typeof query.q === "string" ? query.q : "";
  const [value, setValue] = useState(urlQuery);
  const inputId = useId();

  // Oppdaterer søkefeltet når søket i url endres, f.eks. ved tilbake-knappen
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setValue(urlQuery);
  }

  useMount(() => {
    // Sett fokus på søkefelt hvis vi er på forsiden
    if (pathname === "/") {
      inputRef.current?.focus();
    }
    // Setter/beholder fokus på søkefelt hvis man nettop har gjort et søk på forsiden
    if (urlQuery) {
      inputRef.current?.focus();
    }
  });

  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      value && push(`/sok?q=${encodeURIComponent(value)}`);
    },
    [value, push],
  );

  useEffect(() => {
    // Søker automatisk etter 1 sekund, men ikke hvis søket allerede ligger i url
    if (!value || value === urlQuery) return;
    const timeout = setTimeout(() => handleSubmit(), 1000);
    return () => clearTimeout(timeout);
  }, [value, urlQuery, handleSubmit]);

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
        <Stack gap=".25rem">
          <Box asChild fontWeight="600" fontSize="1.5rem">
            <label htmlFor={inputId}>Søk i samlingen</label>
          </Box>
          <Box asChild role="search" display="flex" flex="1" alignItems="flex-end">
            <form onSubmit={handleSubmit}>
              <InputGroup
                startElement={
                  <Icon asChild pointerEvents="none" color="whiteAlpha.500" aria-hidden>
                    <Search size="1.2em" />
                  </Icon>
                }
              >
                <Input
                  id={inputId}
                  type="search"
                  placeholder="Søk etter et verk.."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  ref={inputRef}
                  backgroundColor="whiteAlpha.200"
                  color="whiteAlpha.900"
                  _placeholder={{
                    color: "whiteAlpha.500",
                  }}
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
            </form>
          </Box>
        </Stack>
      </Container>
    </Container>
  );
}

export default SearchInput;
