import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SimpleAlert } from '../src/components/alerts/SimpleAlert';
import userEvent from '@testing-library/user-event';

describe('<SimpleAlert>', () => {
    it('should render correctly', () => {
        const { container } = render(<SimpleAlert type="danger">Erreur</SimpleAlert>);
        // use to display dom tree durint the test
        // screen.debug();

        // create a snapshot to compare, filled at first test
        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="alert alert-danger"
            role="alert"
          >
            Erreur
            <button>
              Fermer
            </button>
          </div>
        `);
    });

    it('should close the alert on click', async () => {
        const { container } = render(<SimpleAlert type="danger">Erreur</SimpleAlert>);
        await userEvent.click(screen.getByText('Fermer'));
        expect(container.firstChild).toMatchInlineSnapshot('null');
    });

    // Generated test by Codeium
    it('renders alert with default type and children', () => {
        render(<SimpleAlert>Alert message</SimpleAlert>);
        const alertElement = screen.getByRole('alert');
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveClass('alert alert-info');
        expect(alertElement).toHaveTextContent('Alert message');
    });

    it('renders alert with specified type and children', () => {
        render(<SimpleAlert type="danger">Danger message</SimpleAlert>);
        const alertElement = screen.getByRole('alert');
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveClass('alert alert-danger');
        expect(alertElement).toHaveTextContent('Danger message');
    });

    it('hides alert when "Fermer" button is clicked', async () => {
        render(<SimpleAlert>Alert message</SimpleAlert>);
        const alertElement = screen.getByRole('alert');
        const closeButton = screen.getByText('Fermer');

        await userEvent.click(closeButton);

        expect(alertElement).not.toBeInTheDocument();
    });
});
