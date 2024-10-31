import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Octokit } from 'octokit';
import GhPolyglot from 'gh-polyglot';
import Page from './page';

jest.mock('octokit');
jest.mock('gh-polyglot');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Page component', () => {

});
