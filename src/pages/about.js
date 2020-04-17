import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { FaCheckCircle } from 'react-icons/fa'
import './index.css'

import Sidebar from '../components/sidebar/Sidebar'
import TechTag from '../components/tags/TechTag'

const AboutPage = (props) => {
  const labels = props.data.site.siteMetadata.labels
  const aboutTags = ['react', 'nodejs', 'html', 'css']
  const tags = {}
  labels.forEach((label) => {
    aboutTags.forEach((tag) => {
      if (tag === label.tag) {
        tags[tag] = label.name
      }
    })
  })

  return (
    <Layout>
      <SEO title="About" />
      <div className="post-page-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>

        <div className="post-main">
          <SEO title="About" />
          <div className="mt-3">
            <h2 className="heading">Hi, I&apos;m Kelvin Mok</h2>
            <p>
              <i>
                I&apos;m a Frontend Engineer. After graduated from Feng Chia University, i have been join Microprogram
                since Feb 2019. Honestly, i just find my interest on web development when i have engaged in Internship
                on my last semester in Year four.
              </i>
            </p>
            <br />
            <h4>目前</h4>
            <div>
              <span className="text-success d-inline-block" title="blazing">
                <FaCheckCircle size={26} style={{ color: 'success' }} />
              </span>
              <p className="d-inline-block ml-3 w-75 align-top"> 微程式資訊股份有限公司 前端工程師</p>
            </div>
            <div>
              <span className="text-success d-inline-block" title="prism">
                <FaCheckCircle size={26} style={{ color: 'success' }} />
              </span>
              <p className="d-inline-block ml-3 w-75 align-top">Javascript</p>
            </div>
            <div>
              <span className="text-success d-inline-block" title="icons">
                <FaCheckCircle size={26} style={{ color: 'success' }} />
              </span>
              <p className="d-inline-block ml-3 w-75 align-top">React.js, Redux, Next.js</p>
            </div>
            <div>
              <span className="text-success d-inline-block" title="mobile">
                <FaCheckCircle size={26} style={{ color: 'success' }} />
              </span>
              <p className="d-inline-block ml-3 w-75 align-top">學習中： Vue.js</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query aboutQuery {
    site {
      siteMetadata {
        labels {
          tag
          tech
          name
          size
          color
        }
      }
    }
  }
`

export default AboutPage
