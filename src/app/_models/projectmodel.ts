export interface ProjectModel {
    title: string;
    subtitle: string;
    image: string;
    imagedesc: string;
    desc: string;
    tags: string[];
    route: string;
    [key: string]: string | string[];
}
