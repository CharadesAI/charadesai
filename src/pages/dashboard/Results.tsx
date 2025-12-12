import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  useAIResults,
  generateDemoResults,
  type AIResult,
} from "@/hooks/use-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Search,
  Filter,
  Play,
  CheckCircle,
  Loader2,
  Clock,
  AlertCircle,
  Eye,
  Mic,
  Hand,
  Heart,
  MessageSquare,
  Wand2,
  Zap,
  FileVideo,
  Copy,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Results = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedResult, setSelectedResult] = useState<AIResult | null>(null);

  const { data: resultsRaw, isLoading, refetch } = useAIResults(20);

  const results: AIResult[] = useMemo(
    () => resultsRaw || generateDemoResults(),
    [resultsRaw]
  );

  const filteredResults = useMemo(() => {
    return results.filter((r) => {
      const matchesSearch =
        searchQuery === "" ||
        r.input_preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.output?.transcript?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || r.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [results, searchQuery, selectedType]);

  const stats = useMemo(() => {
    const completed = results.filter((r) => r.status === "completed").length;
    const processing = results.filter((r) => r.status === "processing").length;
    const avgConfidence =
      results.reduce((sum, r) => sum + (r.output?.confidence || 0), 0) /
      results.filter((r) => r.output?.confidence).length;
    return { completed, processing, avgConfidence };
  }, [results]);

  const getTypeIcon = (type: AIResult["type"]) => {
    switch (type) {
      case "lip-reading":
        return <MessageSquare className='w-4 h-4' />;
      case "gesture":
        return <Hand className='w-4 h-4' />;
      case "emotion":
        return <Heart className='w-4 h-4' />;
      case "speech-to-text":
        return <Mic className='w-4 h-4' />;
    }
  };

  const getTypeLabel = (type: AIResult["type"]) => {
    switch (type) {
      case "lip-reading":
        return "Lip Reading";
      case "gesture":
        return "Gesture Recognition";
      case "emotion":
        return "Emotion Analysis";
      case "speech-to-text":
        return "Speech to Text";
    }
  };

  const getTypeColor = (type: AIResult["type"]) => {
    switch (type) {
      case "lip-reading":
        return "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30";
      case "gesture":
        return "bg-neon-violet/20 text-neon-violet border-neon-violet/30";
      case "emotion":
        return "bg-pink-500/20 text-pink-500 border-pink-500/30";
      case "speech-to-text":
        return "bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30";
    }
  };

  const getStatusBadge = (status: AIResult["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className='bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30'>
            <CheckCircle className='w-3 h-3 mr-1' />
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className='bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30'>
            <Loader2 className='w-3 h-3 mr-1 animate-spin' />
            Processing
          </Badge>
        );
      case "queued":
        return (
          <Badge className='bg-yellow-500/20 text-yellow-500 border-yellow-500/30'>
            <Clock className='w-3 h-3 mr-1' />
            Queued
          </Badge>
        );
      case "failed":
        return (
          <Badge className='bg-red-500/20 text-red-500 border-red-500/30'>
            <AlertCircle className='w-3 h-3 mr-1' />
            Failed
          </Badge>
        );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        {/* Using demo results when backend listing route is unavailable */}
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold flex items-center gap-2'>
              <Sparkles className='w-8 h-8 text-neon-cyan' />
              AI Processing Results
            </h1>
            <p className='text-muted-foreground mt-1'>
              View and analyze your AI-processed content
            </p>
          </div>
          <Button
            variant='heroOutline'
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            ) : (
              <RefreshCw className='w-4 h-4 mr-2' />
            )}
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Completed Jobs
                  </p>
                  <p className='text-2xl font-bold text-neon-emerald'>
                    {stats.completed}
                  </p>
                </div>
                <CheckCircle className='w-8 h-8 text-neon-emerald/50' />
              </div>
            </CardContent>
          </Card>

          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>Processing</p>
                  <p className='text-2xl font-bold text-neon-cyan'>
                    {stats.processing}
                  </p>
                </div>
                <Loader2 className='w-8 h-8 text-neon-cyan/50 animate-spin' />
              </div>
            </CardContent>
          </Card>

          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Avg Confidence
                  </p>
                  <p className='text-2xl font-bold text-neon-violet'>
                    {(stats.avgConfidence * 100).toFixed(1)}%
                  </p>
                </div>
                <Wand2 className='w-8 h-8 text-neon-violet/50' />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardContent className='p-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  placeholder='Search results...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 bg-background/50'
                />
              </div>
              <Tabs
                value={selectedType}
                onValueChange={setSelectedType}
                className='w-full sm:w-auto'
              >
                <TabsList className='grid grid-cols-5 w-full sm:w-auto'>
                  <TabsTrigger value='all' className='gap-1'>
                    <Filter className='w-3 h-3' />
                    <span className='hidden sm:inline'>All</span>
                  </TabsTrigger>
                  <TabsTrigger value='lip-reading' className='gap-1'>
                    <MessageSquare className='w-3 h-3' />
                    <span className='hidden sm:inline'>Lip</span>
                  </TabsTrigger>
                  <TabsTrigger value='gesture' className='gap-1'>
                    <Hand className='w-3 h-3' />
                    <span className='hidden sm:inline'>Gesture</span>
                  </TabsTrigger>
                  <TabsTrigger value='emotion' className='gap-1'>
                    <Heart className='w-3 h-3' />
                    <span className='hidden sm:inline'>Emotion</span>
                  </TabsTrigger>
                  <TabsTrigger value='speech-to-text' className='gap-1'>
                    <Mic className='w-3 h-3' />
                    <span className='hidden sm:inline'>Speech</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        {isLoading ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className='bg-card/80 backdrop-blur-md border-border'
              >
                <CardContent className='p-6'>
                  <Skeleton className='h-32 w-full mb-4' />
                  <Skeleton className='h-4 w-3/4 mb-2' />
                  <Skeleton className='h-4 w-1/2' />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredResults.length === 0 ? (
          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardContent className='py-16 text-center'>
              <Sparkles className='w-12 h-12 mx-auto mb-4 text-muted-foreground/50' />
              <h3 className='text-lg font-semibold mb-2'>No results found</h3>
              <p className='text-muted-foreground'>
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredResults.map((result) => (
              <Dialog key={result.id}>
                <DialogTrigger asChild>
                  <Card
                    className={cn(
                      "bg-card/80 backdrop-blur-md border-border cursor-pointer transition-all",
                      "hover:border-neon-cyan/30 hover:shadow-lg hover:shadow-neon-cyan/5",
                      "group"
                    )}
                    onClick={() => setSelectedResult(result)}
                  >
                    <CardContent className='p-6'>
                      {/* Preview Area */}
                      <div className='relative h-32 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 mb-4 overflow-hidden'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div
                            className={cn(
                              "w-16 h-16 rounded-xl flex items-center justify-center",
                              result.type === "lip-reading" &&
                                "bg-neon-cyan/20",
                              result.type === "gesture" && "bg-neon-violet/20",
                              result.type === "emotion" && "bg-pink-500/20",
                              result.type === "speech-to-text" &&
                                "bg-neon-emerald/20"
                            )}
                          >
                            <FileVideo
                              className={cn(
                                "w-8 h-8",
                                result.type === "lip-reading" &&
                                  "text-neon-cyan",
                                result.type === "gesture" && "text-neon-violet",
                                result.type === "emotion" && "text-pink-500",
                                result.type === "speech-to-text" &&
                                  "text-neon-emerald"
                              )}
                            />
                          </div>
                        </div>
                        {result.status === "processing" && (
                          <div className='absolute inset-x-0 bottom-0 h-1 bg-muted'>
                            <div className='h-full bg-neon-cyan animate-pulse w-2/3' />
                          </div>
                        )}
                        <div className='absolute top-2 right-2'>
                          {getStatusBadge(result.status)}
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70'
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                      </div>

                      {/* Info */}
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <Badge className={getTypeColor(result.type)}>
                            {getTypeIcon(result.type)}
                            <span className='ml-1'>
                              {getTypeLabel(result.type)}
                            </span>
                          </Badge>
                          {result.output?.confidence && (
                            <span className='text-sm text-muted-foreground'>
                              {Math.round(result.output.confidence * 100)}%
                              confident
                            </span>
                          )}
                        </div>

                        <div>
                          <p className='text-sm font-medium truncate'>
                            {result.input_preview}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {new Date(result.created_at).toLocaleString()}
                          </p>
                        </div>

                        {result.output?.transcript && (
                          <p className='text-sm text-muted-foreground line-clamp-2 italic'>
                            "{result.output.transcript}"
                          </p>
                        )}

                        {result.duration_ms && (
                          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                            <Zap className='w-3 h-3' />
                            Processed in {result.duration_ms}ms
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className='max-w-2xl'>
                  <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                      {getTypeIcon(result.type)}
                      {getTypeLabel(result.type)} Result
                    </DialogTitle>
                    <DialogDescription>
                      Job ID: {result.job_id}
                    </DialogDescription>
                  </DialogHeader>

                  <div className='space-y-6'>
                    {/* Status and Meta */}
                    <div className='flex flex-wrap items-center gap-4'>
                      {getStatusBadge(result.status)}
                      <span className='text-sm text-muted-foreground'>
                        {new Date(result.created_at).toLocaleString()}
                      </span>
                      {result.duration_ms && (
                        <span className='text-sm text-muted-foreground flex items-center gap-1'>
                          <Zap className='w-3 h-3' />
                          {result.duration_ms}ms
                        </span>
                      )}
                    </div>

                    {/* Input Info */}
                    <Card className='bg-muted/30'>
                      <CardHeader className='pb-2'>
                        <CardTitle className='text-sm'>Input</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='flex items-center gap-3'>
                          <FileVideo className='w-8 h-8 text-muted-foreground' />
                          <div>
                            <p className='font-medium'>
                              {result.input_preview}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Video file
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Output */}
                    {result.output && (
                      <Card className='bg-muted/30'>
                        <CardHeader className='pb-2'>
                          <CardTitle className='text-sm flex items-center justify-between'>
                            <span>Output</span>
                            {result.output.confidence && (
                              <Badge variant='secondary'>
                                {Math.round(result.output.confidence * 100)}%
                                confidence
                              </Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                          {result.output.transcript && (
                            <div>
                              <p className='text-sm text-muted-foreground mb-2'>
                                Transcript:
                              </p>
                              <div className='p-4 rounded-lg bg-background/50 relative group'>
                                <p className='pr-8'>
                                  {result.output.transcript}
                                </p>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
                                  onClick={() =>
                                    copyToClipboard(
                                      result.output?.transcript || ""
                                    )
                                  }
                                >
                                  <Copy className='w-4 h-4' />
                                </Button>
                              </div>
                            </div>
                          )}

                          {result.output.gestures && (
                            <div>
                              <p className='text-sm text-muted-foreground mb-2'>
                                Detected Gestures:
                              </p>
                              <div className='space-y-2'>
                                {result.output.gestures.map((g, i) => (
                                  <div
                                    key={i}
                                    className='flex items-center justify-between p-3 rounded-lg bg-background/50'
                                  >
                                    <span className='font-medium'>
                                      {g.name}
                                    </span>
                                    <div className='flex items-center gap-2'>
                                      <Progress
                                        value={g.confidence * 100}
                                        className='w-24 h-2'
                                      />
                                      <span className='text-sm text-muted-foreground w-12 text-right'>
                                        {Math.round(g.confidence * 100)}%
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {result.output.emotions && (
                            <div>
                              <p className='text-sm text-muted-foreground mb-2'>
                                Detected Emotions:
                              </p>
                              <div className='space-y-2'>
                                {result.output.emotions.map((e, i) => (
                                  <div
                                    key={i}
                                    className='flex items-center justify-between p-3 rounded-lg bg-background/50'
                                  >
                                    <span className='font-medium'>
                                      {e.name}
                                    </span>
                                    <div className='flex items-center gap-2'>
                                      <Progress
                                        value={e.confidence * 100}
                                        className='w-24 h-2'
                                      />
                                      <span className='text-sm text-muted-foreground w-12 text-right'>
                                        {Math.round(e.confidence * 100)}%
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Actions */}
                    <div className='flex gap-2'>
                      <Button variant='heroOutline' className='flex-1'>
                        <ExternalLink className='w-4 h-4 mr-2' />
                        View in API
                      </Button>
                      <Button variant='hero' className='flex-1'>
                        <Play className='w-4 h-4 mr-2' />
                        Reprocess
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {/* Live Processing Banner */}
        {stats.processing > 0 && (
          <Card className='bg-gradient-to-r from-neon-cyan/10 via-neon-violet/10 to-pink-500/10 border-neon-cyan/20'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center'>
                  <Loader2 className='w-6 h-6 text-neon-cyan animate-spin' />
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold'>
                    {stats.processing} job{stats.processing > 1 ? "s" : ""}{" "}
                    currently processing
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Results will appear automatically when ready
                  </p>
                </div>
                <Button variant='ghost' size='sm' onClick={() => refetch()}>
                  <RefreshCw className='w-4 h-4 mr-2' />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Results;
