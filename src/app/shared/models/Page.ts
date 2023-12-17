
export interface Page<T> {
    content: T[];       // Liste des éléments actuels sur la page
    totalPages: number;  // Nombre total de pages
    totalElements: number;  // Nombre total d'éléments dans toutes les pages
    size: number;       // Nombre d'éléments par page
    number: number;     // Numéro de la page actuelle (commence à 0)
    first: boolean;     // Indique si c'est la première page
    last: boolean;      // Indique si c'est la dernière page
}
