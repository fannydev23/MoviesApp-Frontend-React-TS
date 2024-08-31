import { createRoot } from 'react-dom/client'
import { MoviesApp } from './MoviesApp.tsx'
import './styles.css';

createRoot(document.getElementById('root')!).render(
    <MoviesApp />
)
