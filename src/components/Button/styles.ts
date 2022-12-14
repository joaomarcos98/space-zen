import { darken } from 'polished'
import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'

export type WrapperProps = {
    withIcon: boolean
} & Omit<ButtonProps, 'children'>

const wrapperModifiers = {
    small: (theme: DefaultTheme) => css`
        height: 3rem;
        font-size: ${theme.font.sizes.xsmall};
    `,
    medium: (theme: DefaultTheme) => css`
        height: 4rem;
        font-size: ${theme.font.sizes.small};
        padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
    `,
    large: (theme: DefaultTheme) => css`
        height: 5rem;
        font-size: ${theme.font.sizes.medium};
        padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
    `,
    fullWidth: () => css`
        width: 100%;
    `,
    withIcon: (theme: DefaultTheme) => css`
        svg {
            width: 1.5rem;

            & + span {
                margin-left: ${theme.spacings.xxsmall};
            }
        }
    `,
    minimal: (theme: DefaultTheme) => css`
        background: none;
        color: ${theme.colors.primary};

        &:hover {
            color: ${darken(0.1, theme.colors.primary)};
        }

    `
}

export const Wrapper = styled.button<WrapperProps>`
    ${({ theme, size, fullWidth, withIcon, minimal }) => css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        border: none;
        border-radius: ${theme.border.radius};
        padding: ${theme.spacings.xxsmall};
        text-decoration: none;

        cursor: pointer;

        &:focus-within {
            outline-offset: 3px;
            outline-color: ${theme.colors.primary};
        }

        &:hover {
            background-color: ${darken(0.1, theme.colors.primary)};
        }

        ${!!size && wrapperModifiers[size](theme)}

        ${!!fullWidth && wrapperModifiers.fullWidth()}

        ${!!withIcon && wrapperModifiers.withIcon(theme)}

        ${!!minimal && wrapperModifiers.minimal(theme)}
    `}
`
