import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Email } from '@styled-icons/material-outlined'

import { renderWithTheme } from "utils/tests/renderWithTheme"


import TextField from '.'

describe('<TextField />', () => {
    it('Renders with Label', () => {
        renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />)

        expect(screen.getByLabelText('Label')).toBeInTheDocument()
    })

    it('Renders without Label', () => {
        renderWithTheme(<TextField />)

        expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
    })

    it('Renders with placeholder', () => {
        renderWithTheme(<TextField placeholder="hey you" />)

        expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
    })

    it('Changes its value when typing', async () => {
        const onInput = jest.fn()
        renderWithTheme(
            <TextField
                onInput={onInput}
                label="TextField"
                labelFor="TextField"
                id="TextField"
            />
        )

        const input = screen.getByRole('textbox')
        const text = 'This is my new text'
        userEvent.type(input, text)

        await waitFor(() => {
            expect(input).toHaveValue(text)
            expect(onInput).toHaveBeenCalledTimes(text.length)
        })
        expect(onInput).toHaveBeenCalledWith(text)
    })

    it('Renders with Icon', () => {
        renderWithTheme(<TextField icon={<Email data-testid="icon" />} />)

        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('Does not changes its value when disabled', async () => {
        const onInput = jest.fn()
        renderWithTheme(
            <TextField
                onInput={onInput}
                label="TextField"
                labelFor="TextField"
                id="TextField"
                disabled
            />
        )
        const input = screen.getByRole('textbox')

        const text = 'this is my new text'

        userEvent.type(input, text)

        await waitFor(() => {
            expect(input).not.toHaveValue(text)
        })
        expect(onInput).not.toHaveBeenCalled()
    })

    it('Renders with error', () => {
        const { container } = renderWithTheme(
            <TextField
                icon={<Email data-testid="icon" />}
                label="TextField"
                labelFor="TextField"
                error="Error message"
            />
        )

        expect(screen.getByText('Error message')).toBeInTheDocument()

        expect(container.firstChild).toMatchSnapshot()
    })

    it('Is accessible by tab', () => {
        renderWithTheme(
            <TextField label="TextField" labelFor="TextField" id="TextField" />
        )

        const input = screen.getByLabelText('TextField')
        expect(document.body).toHaveFocus()

        userEvent.tab()
        expect(input).toHaveFocus()
    })
})
