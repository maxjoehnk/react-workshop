Ablauf
## Tag 1
Überblick
* Routing
	* React Router vs Tan Stack Router
* Infrastruktur
	* Vite
* Ordnerstruktur
	* Atomic Design
```
	/src/
	  /api/
	  /app/
		/routes/
	  /components/
	    /atoms/
	    /molecules/
		/organisms/
		/pages/
		/templates/
	  /hooks/
	  /platform/
	  /styles/
	  /main.tsx
```
    * Größere Anwendungen
```
	/src/
	  /api/
	  /app/
		/routes/
	  /components/
	    /atoms/
	    /molecules/
		/organisms/
		/pages/
		/templates/
      /modules/
        /<module>/
		  /routes/
	      /components/
	        /atoms/
	        /molecules/
	    	/organisms/
	    	/pages/
	    	/templates/

	  /hooks/
	  /platform/
	  /styles/
	  /main.tsx
```
		
* Testing
	* vitest
	* react testing-library
	* Storybook/Regression Testing?
* OIDC
	* oidc-spa
* Mehrsprachigkeit
	* es2015-i18n-tag
		* Seemingly out of support
		* Mit tooling für schema Erzeugung und Validierung solide
	* react-i18next
		* Typescript validierung
		* Weit verbreitet/Viel support
* Formulare
	* Plain
	* Formik
		* Did it's job
		* wird nicht mehr viel verwendet
		* (anscheinend) Performance Probleme bei großen Formularen
	* react-hook-form
		* fan favorite
	* TanStack Forms
		* new kid on the block
	* Validierung
		* zod
			* Integration in alle 3 Formularbibliotheken
			* Integration mit oidc-spa
			* Integration mit tanstack router
* UI Libraries
	* MaterialUI
		* Sinnvoll wenn eh schon verwendet
	* Shad/CN
		* Beliebt bei neuen Projekten, gute a11y, basiert auf tailwind & radix, components leben im repo und können über cli aktualisiert werden
	* HeroUI
		* basiert ebenfalls auf tailwind & radix, aber klassischere component library
* Storybook
* Data Loading
	* fetch & useEffect
	* React Query
* State Management
	* Redux
	* mobx
	* Zustand?
* Server 2 Frontend communication
	* WebSockets
	* SSE
* Beispiel Projekt
	* Formular getrieben
	* Domäne
		* VET?
		* Issue Tracker
		* TODO
			* Nicht komplex genug
## Tag 2
Projekt Setup
* npx create vite
* 

# React Workshop
### BBV

---

## Projektsetup & Stack




### Stolperfallen & Urban Legends

- "useEffect für alles"
- Prop Drilling vs. Over-Engineering
- Deprecated Patterns aus Blog-Posts
- Veraltete Tutorials erkennen

--

### Deprecated Blog Content

- Class Components → Functional Components
- HOCs → Hooks
- componentDidMount → useEffect
- Redux Boilerplate → Redux Toolkit
- Welchen Quellen kann man trauen?
