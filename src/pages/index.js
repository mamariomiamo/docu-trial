import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Markdown Language</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus V2 is used to build this technical details website, which support markdown language, latex and all React features.
        You may find some good tutorials on Markdown <a href="./docs/examples/doc1">here</a>. Have fun!
      </>
    ),
  },
  {
    title: <>Create Pages</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Every page is a <code>.md</code> file, arranged by folders. After creating a file, edit the <code>sidebars.js</code> and <code>docusaurus.config.js</code> accordingly, to make the page visible for browsing.
      </>
    ),
  },
  {
    title: <>Where to Edit</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        The source files are located in <a href="smb://deptnas.nus.edu.sg/tsl/Research/Centre%20Flight%20Science/Intelligent%20Unmanned%20Systems/Research%20Data%20Backup/Users/00_Tech_Details/docs">this folder (Linux)</a>, or <a href="file://deptnas.nus.edu.sg/tsl/Research/Centre%20Flight%20Science/Intelligent%20Unmanned%20Systems/Research%20Data%20Backup/Users/00_Tech_Details/docs">this folder (Windows)</a>

        <br></br>
        
        The website is being build twice a day (12:30 noon and 00:30 at night), at this <a href="http://172.18.72.192/tech-details/">link</a>. The live preview is availalbe at this  <a href="http://172.18.72.192:8888/tech-details/">link</a>.

      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--success button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/examples/doc1')}>
              Markdown Tutorials
            </Link>
            &nbsp;
            <Link
              className={clsx(
                'button button--secondary  button--lg',
              )}
              to={useBaseUrl('docs/examples/doc0')}>
              Start a New Page
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
