import { Meta, StoryObj } from '@storybook/nextjs';
import Button from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'shared/ui/Button/Playground',
};

export default meta;

export type Story = StoryObj<typeof Button>;

export const First = {
    args: {
        variant: 'primary',
        text: 'Оформить карту',
        icon: 'arrow',
        disabled: false,
    },
};

export const ArrowRight = {
    args: {
        variant: 'arrow',
        icon: 'arrow-right',
        disabled: false,
    },
};

export const ArrowLeft = {
    args: {
        variant: 'arrow',
        icon: 'arrow-left',
        disabled: false,
    },
};

export const Tag = {
    args: {
        variant: 'tag',
        text: 'Восхождение',
        disabled: false,
    },
};

export const Menu = {
    args: {
        variant: 'menu',
        disabled: false,
        icon: 'menu',
    },
};
