/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"

export default function Services() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-2">
          <div className="bg-[#1e1e1e] rounded-full p-1.5 flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm font-medium pr-2">What you'll get</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-12 max-w-3xl mx-auto">
          We resolve problems associated with
          <br /> creative procedures.
        </h1>

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Card 1 */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:bg-[#252525] hover:shadow-[0_0_15px_rgba(196,255,0,0.15)] cursor-pointer">
            <div className="bg-black rounded-xl p-4 mb-6 w-full">
              <div className="flex flex-col">
                <span className="text-[#c4ff00] text-sm font-medium mb-2">Growth</span>
                <div className="flex items-end h-32 gap-1.5">
                  {[15, 30, 10, 45, 20, 35, 15, 50, 25, 40, 20, 60].map((height, i) => (
                    <div key={i} className="w-3 bg-[#c4ff00] rounded-sm" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Mon, 10</span>
                  <span>Wed, 11</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Cost effective solution</h3>
            <p className="text-gray-400 text-sm">Get high-quality design work at a fraction of the cost.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:bg-[#252525] hover:shadow-[0_0_15px_rgba(196,255,0,0.15)] cursor-pointer">
            <div className="bg-black rounded-xl p-4 mb-6 w-full h-48 flex items-center justify-center">
              <div className="bg-black border border-gray-800 rounded-xl p-3 w-56">
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
                  <span className="text-[10px] text-gray-500">RECEIVED</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#c4ff00] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#c4ff00] mr-1"></div>
                      <span className="text-[10px] text-[#c4ff00]">NEW</span>
                    </div>
                    <span className="text-xs font-medium">Latest design</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500">Today, 11:30</div>
                <div className="border-t border-dashed border-gray-800 my-2"></div>
                <div className="h-4 bg-gray-900 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-gray-900 rounded-full w-3/4"></div>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Tailor-made design</h3>
            <p className="text-gray-400 text-sm">We've got the expertise to make your vision a reality.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:bg-[#252525] hover:shadow-[0_0_15px_rgba(196,255,0,0.15)] cursor-pointer">
            <div className="bg-black rounded-xl p-4 mb-6 w-full h-48 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center">
                <svg viewBox="0 0 200 100" className="w-full">
                  <path d="M0,50 Q25,70 50,50 T100,50 T150,30 T200,10" fill="none" stroke="#c4ff00" strokeWidth="3" />
                  <circle cx="200" cy="10" r="5" fill="#c4ff00" />
                </svg>
                <div className="absolute left-0 top-0 w-full h-full flex justify-between items-center text-xs text-gray-500">
                  <div>Q1</div>
                  <div>Q2</div>
                  <div>Q3</div>
                  <div>Q4</div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Scalable as you grow</h3>
            <p className="text-gray-400 text-sm">We're ready to meet your evolving needs.</p>
          </div>
        </div>

        {/* Bottom Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Workflow Integration Card */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-[#252525] hover:shadow-[0_0_15px_rgba(196,255,0,0.15)] cursor-pointer">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium mb-1">Workflow</h3>
                <h3 className="text-xl font-medium mb-2">integration</h3>
                <p className="text-gray-400 text-sm">Seamlessly connect all your existing apps.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-gray-800 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1abcfe">
                    <path d="M8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8V12H8Z" />
                    <path d="M12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12H12V8Z" />
                    <path d="M12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12H12V16Z" />
                    <path d="M16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16V12H16Z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-gray-800 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-gray-800 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.154 5.135L12.1 0.767L2.046 5.135L12.1 9.503L22.154 5.135ZM12.1 10.444L2.046 6.076V15.444L12.1 19.812V10.444ZM12.1 19.812L22.154 15.444V6.076L12.1 10.444V19.812Z"
                      fill="#FF3366"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-gray-800 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 4l16 16M4 20L20 4" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-gray-800 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF5D01">
                    <path d="M16.174 2.619a10.897 10.897 0 00-4.27 0 8.258 8.258 0 00-3.928 1.938 8.259 8.259 0 00-2.197 3.802 10.897 10.897 0 00-.42 4.256 8.259 8.259 0 001.938 3.928 8.258 8.258 0 003.802 2.197 10.897 10.897 0 004.256.42 8.258 8.258 0 003.928-1.938 8.258 8.258 0 002.197-3.802l.014-.42z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-gray-800 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#5865F2">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.02.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborate Card */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-[#252525] hover:shadow-[0_0_15px_rgba(196,255,0,0.15)] cursor-pointer">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-xl font-medium mb-1">Collaborate</h3>
                <h3 className="text-xl font-medium mb-2">real-time</h3>
                <p className="text-gray-400 text-sm">Seamlessly connect all your existing apps.</p>
              </div>
              <div className="relative h-16 w-24">
                <div className="absolute right-0 bottom-0 w-10 h-10 rounded-full bg-[#e94a84] border-2 border-[#1e1e1e] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="absolute right-6 bottom-0 w-10 h-10 rounded-full bg-[#4a9fe9] border-2 border-[#1e1e1e] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="absolute right-12 bottom-0 w-10 h-10 rounded-full bg-[#c4ff00] border-2 border-[#1e1e1e] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-[#c4ff00] text-[8px] text-black font-bold px-1 rounded">
                    Elsa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          <div className="bg-[#1e1e1e] rounded-full py-2 px-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_10px_rgba(196,255,0,0.2)] cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm">Design workshops</span>
          </div>
          <div className="bg-[#1e1e1e] rounded-full py-2 px-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_10px_rgba(196,255,0,0.2)] cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm">Workshops</span>
          </div>
          <div className="bg-[#1e1e1e] rounded-full py-2 px-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_10px_rgba(196,255,0,0.2)] cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm">Trend reports</span>
          </div>
          <div className="bg-[#1e1e1e] rounded-full py-2 px-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_10px_rgba(196,255,0,0.2)] cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm">Asset library</span>
          </div>
          <div className="bg-[#1e1e1e] rounded-full py-2 px-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_10px_rgba(196,255,0,0.2)] cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm">Rollover hours</span>
          </div>
          <div className="bg-[#1e1e1e] rounded-full py-2 px-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_10px_rgba(196,255,0,0.2)] cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm">Premium designers</span>
          </div>
          <div className="bg-[#1e1e1e] rounded-full py-2 px-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#252525] hover:shadow-[0_0_10px_rgba(196,255,0,0.2)] cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#c4ff00] flex items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm">Multilingual support</span>
          </div>
        </div>
      </div>
    </div>
  )
}

