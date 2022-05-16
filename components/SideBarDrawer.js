import SideBar from '@/components/SideBar'
import { useRouter } from 'next/router'
import React, { useEffect, useImperativeHandle } from 'react'

const SideBarDrawer = ({
  post,
  currentTag,
  cRef,
  tags,
  posts,
  categories,
  currentCategory
}) => {
  // Exposed to parent component called by cRef.current.handleMenuClick
  useImperativeHandle(cRef, () => {
    return {
      handleSwitchSideDrawerVisible: () => switchSideDrawerVisible(true)
    }
  })

  useEffect(() => {
    const sideBarWrapperElement = document.getElementById('sidebar-wrapper')
    sideBarWrapperElement?.classList?.remove('hidden')
  })

  const router = useRouter()
  useEffect(() => {
    const sideBarDrawerRouteListener = url => {
      switchSideDrawerVisible(false)
    }
    router.events.on('routeChangeComplete', sideBarDrawerRouteListener)
    return () => {
      router.events.off('routeChangeComplete', sideBarDrawerRouteListener)
    }
  }, [router.events])

  // Click the button to change the side drawer state
  const switchSideDrawerVisible = showStatus => {
    if (window) {
      const sideBarDrawer = window.document.getElementById('sidebar-drawer')
      const sideBarDrawerBackground = window.document.getElementById(
        'sidebar-drawer-background'
      )

      if (showStatus) {
        sideBarDrawer.classList.replace('-ml-80', 'ml-0')
        sideBarDrawerBackground.classList.replace('hidden', 'block')
      } else {
        sideBarDrawer.classList.replace('ml-0', '-ml-80')
        sideBarDrawerBackground.classList.replace('block', 'hidden')
      }
    }
  }

  return (
    <div id="sidebar-wrapper" className="hidden">
      <div
        id="sidebar-drawer"
        className="-ml-80 bg-white dark:bg-gray-900 flex flex-col duration-300 fixed h-full left-0 overflow-y-scroll scroll-hidden top-0 z-50 shadow-2xl"
      >
        <SideBar
          tags={tags}
          post={post}
          posts={posts}
          categories={categories}
          currentCategory={currentCategory}
        />
      </div>
      {/* background mask */}
      <div
        id="sidebar-drawer-background"
        onClick={() => {
          switchSideDrawerVisible(false)
        }}
        className="hidden animate__animated animate__fadeIn fixed top-0 duration-300 left-0 z-30 w-full h-full glassmorphism"
      />
    </div>
  )
}
export default SideBarDrawer
