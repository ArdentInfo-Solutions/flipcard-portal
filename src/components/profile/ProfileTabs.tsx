"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebItem } from "../WebItem"
import { PostItem } from "../PostItem"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { WebItem as WebItemType, PostItem as PostItemType } from "@/lib/types"

interface ProfileTabsProps {
  webItems: WebItemType[]
  posts: PostItemType[]
  likedItems: (WebItemType | PostItemType)[]
  bookmarkedItems: (WebItemType | PostItemType)[]
}

export function ProfileTabs({ webItems, posts, likedItems, bookmarkedItems }: ProfileTabsProps) {
  const isPostItem = (item: WebItemType | PostItemType): item is PostItemType => {
    return "content" in item
  }

  const renderItems = (items: (WebItemType | PostItemType)[]) => (
    <div className="space-y-4">
      {items.map((item) =>
        isPostItem(item) ? (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PostItem
              post={item}
              onLike={(id) => console.log("Like:", id)}
              onBookmark={(id) => console.log("Bookmark:", id)}
            />
          </div>
        ) : (
          <WebItem
            key={item.id}
            item={item}
            onLike={(id) => console.log("Like:", id)}
            onBookmark={(id) => console.log("Bookmark:", id)}
          />
        ),
      )}
    </div>
  )

  return (
    <Tabs defaultValue="uploads" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="uploads">My Uploads</TabsTrigger>
        <TabsTrigger value="liked">Liked</TabsTrigger>
        <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="uploads" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Web Items</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {webItems.map((item) => (
                <WebItem
                  key={item.id}
                  item={item}
                  onLike={(id) => console.log("Like:", id)}
                  onBookmark={(id) => console.log("Bookmark:", id)}
                />
              ))}
            </div>
          </ScrollArea>
          <h3 className="text-lg font-semibold">Posts</h3>
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onLike={(id) => console.log("Like:", id)}
                  onBookmark={(id) => console.log("Bookmark:", id)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </TabsContent>
      <TabsContent value="liked" className="space-y-4">
        <ScrollArea className="h-[800px]">{renderItems(likedItems)}</ScrollArea>
      </TabsContent>
      <TabsContent value="bookmarks" className="space-y-4">
        <ScrollArea className="h-[800px]">{renderItems(bookmarkedItems)}</ScrollArea>
      </TabsContent>
      <TabsContent value="activity" className="space-y-4">
        <div className="text-sm text-muted-foreground">Recent activity will be shown here</div>
      </TabsContent>
    </Tabs>
  )
}

