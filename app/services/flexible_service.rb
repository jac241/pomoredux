module FlexibleService
  class Result
    attr_reader :status, :body

    def initialize(was_successful:, status:, body:)
      @was_successful = was_successful
      @status = status
      @body = body
    end

    def on(status)
      yield body if status == self.status
    end

    def success?
      return @was_successful
    end
  end

  def success(status, body = nil)
    Result.new(was_successful: true, status: status, body: body)
  end

  def failure(status, body = nil)
    Result.new(was_successful: false, status: status, body: body)
  end

  def self.included(base)
    base.extend(ClassMethods)
  end

  def to_proc
    proc(&method(:call))
  end

  module ClassMethods
    def to_proc
      proc(&method(:call))
    end

    def call(*params)
      self.new.call(*params)
    end
  end
end
