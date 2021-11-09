import {
    DEPORTE_AMATEUR,
    DEPORTE_FORMATIVO,
    DEPORTE_PROFESIONAL,
    DEPORTE_REPRESENTATIVO,
    LINK_URL
} from './constants';

export const TIPOS_DEPORTISTAS = [
    {
        icon: 'info circle',
        title: 'REPRESENTATIVO',
        description: DEPORTE_REPRESENTATIVO,
        link: LINK_URL
    },
    {
        icon: 'info circle',
        title: 'FORMATIVO',
        description: DEPORTE_FORMATIVO,
        link: LINK_URL
    },
    {
        icon: 'info circle',
        title: 'PROFESIONAL',
        description: DEPORTE_PROFESIONAL,
        link: LINK_URL
    },
    {
        icon: 'info circle',
        title: 'AMATEUR',
        description: DEPORTE_AMATEUR,
        link: LINK_URL
    }
];
