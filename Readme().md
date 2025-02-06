### Rapport de Développement

#### Introduction
Ce document explique les choix, décisions et points d'arrêt rencontrés lors du développement de l'application de gestion des tâches en utilisant NestJS, TypeScript et Prisma. Le projet est structuré autour de plusieurs fichiers, chacun ayant un rôle spécifique dans l'application.

#### Choix et Décisions


2. **Architecture Basée sur les Cas d'Utilisation**:
   - **Pourquoi**: Cette architecture permet de séparer les préoccupations et de rendre le code plus maintenable et testable. Chaque cas d'utilisation représente une action spécifique que l'application peut effectuer.
   - **Décision**: Créer des classes pour chaque cas d'utilisation (`GetAllTasksUseCase`, `SaveTaskUseCase`, `DeleteTask`) et les gérer via une `UseCaseFactory`.

3. **Utilisation de Prisma**:
   - **Pourquoi**: Prisma est un ORM moderne qui simplifie les interactions avec la base de données. Il offre une API type-safe et des migrations de schéma faciles à gérer.
   - **Décision**: Utiliser Prisma pour gérer les opérations de base de données dans le `TaskRepository`.

4. **Gestion des Erreurs dans `SaveTaskUseCase`**:
   - **Pourquoi**: La gestion des erreurs est cruciale pour fournir des messages d'erreur clairs et éviter les plantages inattendus de l'application.
   - **Décision**: Utiliser `BadRequestException` pour capturer et renvoyer les erreurs rencontrées lors de la sauvegarde des tâches. Cela permet de gérer les erreurs de manière centralisée et de fournir des messages d'erreur cohérents.



5. **Utilisation de DTOs (Data Transfer Objects)**:
   - **Pourquoi**: Les DTOs permettent de valider et de transférer les données entre les couches de l'application. Ils assurent que les données reçues et envoyées respectent un certain schéma.
   - **Décision**: Utiliser `SaveTaskDto` pour valider les données des tâches avant de les passer aux cas d'utilisation. Cela garantit que les données sont toujours dans un état valide lorsqu'elles sont traitées.

6. **Structure du Contrôleur**:
   - **Pourquoi**: Le contrôleur est responsable de gérer les requêtes HTTP et de déléguer les opérations aux cas d'utilisation appropriés. Une bonne structure de contrôleur permet de maintenir un code propre et organisé.
   - **Décision**: Créer un `TaskController` avec des méthodes pour chaque opération CRUD (Create, Read, Update, Delete). Chaque méthode utilise la `UseCaseFactory` pour créer et exécuter le cas d'utilisation correspondant.


1. **Problème de Typage avec `UseCaseFactory`**:
   - **Problème**: L'erreur "Argument of type 'typeof SaveTaskUseCase' is not assignable to parameter of type 'Type<UseCases>'" indiquait que `SaveTaskUseCase` n'était pas compatible avec le type attendu.
   - **Solution**: Définir une interface commune `UseCase` pour tous les cas d'utilisation et s'assurer que chaque cas d'utilisation implémente cette interface. Cela a permis de résoudre les problèmes de typage et de garantir que tous les cas d'utilisation partagent une structure commune.


2. **Retour de Type Incorrect dans `SaveTaskUseCase`**:
   - **Problème**: L'erreur "Property 'handle' in type 'SaveTaskUseCase' is not assignable to the same property in base type 'HandlerService<Promise<{ id: number; name: string; createdAt: Date; updatedAt: Date; }>, [dto: SaveTaskDto]>'" indiquait que la méthode `handle` ne retournait pas le type attendu.
   - **Solution**: Modifier la méthode `handle` pour qu'elle retourne un objet avec la structure correcte.

3. **Gestion des Opérations de Base de Données**:
   - **Problème**: Assurer que les méthodes de `TaskRepository` retournent les structures de données correctes.
   - **Solution**: Vérifier et ajuster les méthodes `save` et `update` pour qu'elles retournent les objets avec les propriétés requises.


#### Conclusion
Le développement de cette application a impliqué plusieurs choix architecturaux et la résolution de problèmes de typage et de structure de données. L'utilisation de NestJS, TypeScript et Prisma a permis de créer une application modulaire, maintenable et évolutive. Les difficultés rencontrées ont été résolues en définissant des interfaces communes et en s'assurant que les méthodes retournent les types attendus.