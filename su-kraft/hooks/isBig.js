import {large, useBreakpoint} from "./useBreakpoint";

export const isBig = () => {
    const breakpoint = useBreakpoint();

    return breakpoint === large;
}